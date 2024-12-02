"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "@/types";

export type Poste = {
  id: number;
  titre: string;
  description: string;
  departement: string;
  categoriePersonnel: string | null;
};

export type OffreEmploi = {
  id: number;
  description: string;
  status: boolean;
  datePublication: string;
  poste: Poste;
  nbrCandidatDm: number;
  salaire: number | null;
};

function useCheckSessionId() {
  const router = useRouter();

  useEffect(() => {
    const candidatId = sessionStorage.getItem("candidat_id");

    if (!candidatId) {
        window.location.href ="/auth/login";
    }
  }, [router]);
  return null;
}
export default function OffreEmploiList() {
  useCheckSessionId();
  const [offreEmploi, setOffreEmploi] = useState<OffreEmploi[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOffreEmploi = async () => {
      try {
        const response = await axios.get(api_url + "OffreEmploi");
        setOffreEmploi(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des Offre Emploi :", error);
      }
    };

    fetchOffreEmploi();
  }, []);

  const handlePostuler = (id: number) => {
    router.push(`/front-office/postuler/post/${id}`); // Redirection vers le formulaire
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {offreEmploi.map((offre) => (
        <Card key={offre.id}>
          <CardHeader>
            <h3 className="text-lg font-bold">{offre.poste.titre}</h3>
            <p className="text-sm text-muted-foreground">{offre.poste.departement}</p>
            <p className="text-sm text-muted-foreground">Reste places disponible : {offre.nbrCandidatDm}</p>
            <p className="text-sm text-muted-foreground">Salaire : {offre.salaire}</p>
            <p className="text-slate-600">Date de publication : {offre.datePublication}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{offre.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handlePostuler(offre.id)}>Postuler</Button>
          </CardFooter>
          
        </Card>
      ))}
    </div>
  );
}
