import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// DEMO MODE FLAG - Set to true to bypass authentication for demo purposes
const DEMO_MODE = true;

// Define route access patterns
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/impact',
  '/impact-explorer',
  '/impact/(.*)' // Project details pages
];

const AUTH_ROUTES = [
  '/login',
  '/register',
  '/reset-password'
];

const SUBMITTER_ROUTES = [
  '/submit-project',
  '/submit-impact',
  '/dashboard/projects'
];

const VERIFIER_ROUTES = [
  '/verify',
  '/dashboard/verifications'
];

const FUNDER_ROUTES = [
  '/dashboard/funding'
];

const PROFILE_ROUTES = [
  '/profile/(.*)'
];

export function middleware(request: NextRequest) {
  // If in demo mode, allow access to all routes
  if (DEMO_MODE) {
    return NextResponse.next();
  }
  
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  const isPublicPath = PUBLIC_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the path is an auth path (login, register)
  const isAuthPath = AUTH_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the path is for submitters
  const isSubmitterPath = SUBMITTER_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the path is for verifiers
  const isVerifierPath = VERIFIER_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the path is for funders
  const isFunderPath = FUNDER_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the path is a profile path
  const isProfilePath = PROFILE_ROUTES.some(route => 
    new RegExp(`^${route}$`).test(pathname)
  );
  
  // Check if the user is authenticated (has a session token)
  const token = request.cookies.get('next-auth.session-token')?.value || 
                request.cookies.get('__session')?.value;
  
  const isAuthenticated = !!token;
  
  // Get user role from the request (this would be set during login)
  // In a real implementation, you'd decode the JWT or session token
  // For now, we'll use a simple cookie approach
  const userRole = request.cookies.get('user-role')?.value || 'user';
  
  // Redirect logic
  
  // 1. If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // 2. If trying to access protected pages while not logged in, redirect to login
  if (!isAuthenticated && !isPublicPath && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 3. Role-based access control
  if (isAuthenticated) {
    // Submitter routes check
    if (isSubmitterPath && userRole !== 'submitter' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Verifier routes check
    if (isVerifierPath && userRole !== 'verifier' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Funder routes check
    if (isFunderPath && userRole !== 'funder' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Profile access check - users can only access their own profile
    // This is a simplified check - in reality, you'd compare the profile ID with the user ID
    if (isProfilePath) {
      const profileId = pathname.split('/')[2];
      const userId = request.cookies.get('user-id')?.value;
      
      if (profileId !== userId && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
