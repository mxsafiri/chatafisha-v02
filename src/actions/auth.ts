"use server";

import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb/client";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

const privateKey = process.env.AUTH_PRIVATE_KEY || "";
if (!privateKey) {
  console.warn("Missing AUTH_PRIVATE_KEY in .env file. Authentication will not work properly.");
}

// Make sure the domain doesn't have trailing slashes
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";
const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

const thirdwebAuth = createAuth({
  domain: cleanDomain,
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
});

export const generatePayload = thirdwebAuth.generatePayload;

/**
 * Authenticate a user with thirdweb
 * @param payload The verification payload from the wallet signature
 * @param role The user role to assign (defaults to submitter)
 * @returns Whether the login was successful
 */
export async function login(payload: VerifyLoginPayloadParams, role: UserRole = "submitter") {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  
  if (verifiedPayload.valid) {
    // Generate JWT with user role and permissions in context
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
      context: {
        role,
        isVerifier: role === "verifier",
        isSubmitter: role === "submitter", 
        isFunder: role === "funder",
        isAdmin: role === "admin",
      },
    });
    
    // Set the JWT in a cookie
    cookies().set("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return true;
  }
  
  return false;
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
