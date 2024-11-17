import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axios from "axios";
import { api_url } from "@/types";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Appeler l'API Spring Boot pour l'authentification
      const { data } = await axios.post(
        `${api_url}/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = data;

      // Stocker le token dans un cookie sécurisé
      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60, // 1 heure
          path: "/",
        })
      );

      return res.status(200).json({ message: "Connexion réussie" });
    } catch (error: any) {
      // Gestion des erreurs depuis l'API Spring Boot
      const statusCode = error.response?.status || 500;
      const errorMessage =
        error.response?.data?.message || "Erreur interne du serveur";
      return res.status(statusCode).json({ message: errorMessage });
    }
  }

  // Gestion des méthodes non autorisées
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}



const getIdCandidat = 


