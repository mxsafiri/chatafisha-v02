"use server";

import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client, hasThirdwebConfig } from "@/lib/thirdweb/client";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

// Check for required environment variables
const privateKey = process.env.AUTH_PRIVATE_KEY || "";
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";

// Check if all auth configs are available
export const hasAuthConfig = hasThirdwebConfig && Boolean(privateKey && domain && client);

// Make sure the domain doesn't have trailing slashes
const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

// Only create auth if all required configs are present
const thirdwebAuth = hasAuthConfig 
  ? createAuth({
      domain: cleanDomain,
      adminAccount: privateKeyToAccount({ client: client!, privateKey }),
      client: client!,
    })
  : null;

/**
 * Authenticate a user with thirdweb
 * @param token The JWT token from thirdweb
 * @param role The user role to assign (defaults to submitter)
 * @returns Whether the login was successful
 */
export async function login(params: { token: string }, role: UserRole = "submitter") {
  if (!hasAuthConfig || !thirdwebAuth || !params?.token) {
    console.warn("Authentication is not properly configured or token is missing");
    return false;
  }

  try {
    // Verify the JWT
    const authResult = await thirdwebAuth.verifyJWT({ jwt: params.token });
    if (!authResult.valid) {
      return false;
    }

    // Set the JWT in a cookie
    cookies().set("jwt", params.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return true;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return false;
  }
}

/**
 * Check if the user is currently logged in
 * @returns Whether the user is logged in
 */
export async function isLoggedIn() {
  if (!hasAuthConfig || !thirdwebAuth) {
    return false;
  }

  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }
  
  try {
    const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
    return authResult.valid;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return false;
  }
}

/**
 * Get the current user's data from the JWT
 * @returns User data or null if not logged in
 */
export async function getUserData() {
  if (!hasAuthConfig || !thirdwebAuth) {
    return null;
  }

  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return null;
  }
  
  try {
    const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
    if (!authResult.valid) {
      return null;
    }
    
    // Extract data from the parsed JWT
    const { parsedJWT } = authResult;
    // Access the JWT data directly from parsedJWT
    const jwtData = parsedJWT as any; // Type assertion to avoid TypeScript errors
    const context = jwtData.context || {};
    
    return {
      id: jwtData.sub,
      address: jwtData.address,
      role: context.role || "submitter",
      isVerifier: context.isVerifier || false,
      isSubmitter: context.isSubmitter || true,
      isFunder: context.isFunder || false,
      isAdmin: context.isAdmin || false,
    };
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

/**
 * Log out the current user
 */
export async function logout() {
  cookies().delete("jwt");
}

/**
 * Check if the current user has a specific role
 * @param role The role or roles to check
 * @returns Whether the user has the specified role
 */
export async function hasRole(role: UserRole | UserRole[]) {
  const userData = await getUserData();
  if (!userData) return false;
  
  if (Array.isArray(role)) {
    return role.includes(userData.role as UserRole);
  }
  
  return userData.role === role;
}
