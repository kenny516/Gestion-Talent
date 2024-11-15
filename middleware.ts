// /middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Redirect user to the back office if trying to access the front office
  return NextResponse.redirect(new URL("/back-office/talent", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/front-office/:path*",  // Match any route under /front-office
};
