// /middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import  jwt from 'jsonwebtoken';


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

}

export const config = {
  matcher: "/front-office/:path*",
};
