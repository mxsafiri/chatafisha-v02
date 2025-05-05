import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute, getRedirectPathByRole } from "@/lib/navigation";

// Set to true to bypass authentication checks during development
const DEMO_MODE = true;

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
  
  // In demo mode, allow access to all routes
  if (DEMO_MODE) {
    console.log("DEMO MODE: Bypassing authentication for", pathname);
    return NextResponse.next();
  }
  
  // For production, we would check authentication here
  // But since we're in DEMO_MODE, we won't implement this yet
  
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
