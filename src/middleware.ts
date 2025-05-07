import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute, requiresRole } from "@/lib/navigation";
import { cookies } from "next/headers";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb/client";

const privateKey = process.env.AUTH_PRIVATE_KEY || "";
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "";
const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

const thirdwebAuth = createAuth({
  domain: cleanDomain,
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  
  // Check if the route is protected
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Get JWT from cookies
  const jwt = request.cookies.get("jwt");
  if (!jwt?.value) {
    // Redirect to login if no JWT
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Verify JWT and check role
  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    // Clear invalid JWT and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("jwt");
    return response;
  }
  
  // Extract role from JWT context
  const jwtData = authResult.parsedJWT as any;
  const role = jwtData.context?.role || "user";
  
  // Check if user has required role for this route
  if (!requiresRole(pathname, role)) {
    // Redirect to appropriate dashboard if user doesn't have required role
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
