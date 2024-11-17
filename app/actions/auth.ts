"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useCheckSessionId() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'ID existe dans sessionStorage
    const candidatId = sessionStorage.getItem("candidat_id");

    if (!candidatId) {
      // Redirection vers la page de connexion si l'ID n'existe pas
      router.push("/auth/login");
    }
  }, [router]);

  // Vous pouvez retourner null ici car la redirection est déjà gérée
  return null;
}
