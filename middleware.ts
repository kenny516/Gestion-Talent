// /middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import  jwt from 'jsonwebtoken';


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  /*const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log(request, "Tentative de requête sans token.");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Vérification du token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY || "kenny");

    // Log de la tentative réussie
    console.log(request, "Token validé avec succès.");

    return NextResponse.next();
  } catch (err:any) {
    console.error("Erreur lors de la vérification du token:", err);
    console.log(
      request,
      `Erreur lors de la vérification du token: ${err.response.data}`
    );
  }
  return NextResponse.redirect(new URL("/back-office/talent", request.url));*/
}

export const config = {
  matcher: "/front-office/:path*",
};
