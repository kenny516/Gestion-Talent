// /middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import  jwt from 'jsonwebtoken';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    logAttempt(request, "Tentative de requête sans token.");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Vérification du token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY || "kenny");

    // Log de la tentative réussie
    logAttempt(request, "Token validé avec succès.");

    return NextResponse.next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token:", err);
    logAttempt(
      request,
      `Erreur lors de la vérification du token: ${err.message}`
    );
  }
  return NextResponse.redirect(new URL("/back-office/talent", request.url));
}

export const config = {
  matcher: "/front-office/:path*",
};
