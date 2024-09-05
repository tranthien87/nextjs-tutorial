import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server'; // Import NextResponse

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout', // Add signOut page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('auth details', auth);
      console.log('nextUrl', nextUrl);

      const isLoggedIn = !!auth?.user;
      const isHomePage = nextUrl.pathname === '/';
      const isDashboardPage = nextUrl.pathname === '/dashboard';
      const isSignOutPage = nextUrl.pathname === '/logout'; // Check for signOut page

      if (isHomePage) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && !isDashboardPage && !isSignOutPage) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl)); // Use NextResponse for redirection
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
