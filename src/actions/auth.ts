"use server";

import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb/client";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

const privateKey = process.env.AUTH_PRIVATE_KEY || "";
if (!privateKey) {
  throw new Error("Missing AUTH_PRIVATE_KEY in .env file. Authentication will not work properly.");
}

const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";
if (!domain) {
  throw new Error("Missing NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN in .env file. Authentication will not work properly.");
}

// Make sure the domain doesn't have trailing slashes
const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

const thirdwebAuth = createAuth({
  domain: cleanDomain,
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
});

/**
 * Authenticate a user with thirdweb
 * @param token The JWT token from thirdweb
 * @param role The user role to assign (defaults to submitter)
 * @returns Whether the login was successful
 */
export async function login(token: string, role: UserRole = "submitter") {
  if (!token) {
    return false;
  }

  try {
    // Verify the JWT
    const authResult = await thirdwebAuth.verifyJWT({ jwt: token });
    if (!authResult.valid) {
      return false;
    }

    // Set the JWT in a cookie
    cookies().set("jwt", token, {
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
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }
  
  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  return authResult.valid;
}

/**
 * Get the current user's data from the JWT
 * @returns User data or null if not logged in
 */
export async function getUserData() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return null;
  }
  
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
