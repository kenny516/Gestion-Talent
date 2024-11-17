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
};

function useCheckSessionId() {
  const router = useRouter();

  useEffect(() => {
    const candidatId = sessionStorage.getItem("candidat_id");

    if (!candidatId) {
      router.push("/auth/login");
    }
  }, [router]);
  return null;
}
export default function PostesList() {
  useCheckSessionId();
  const [postes, setPostes] = useState<Poste[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await axios.get(api_url + "poste");
        setPostes(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des postes :", error);
      }
    };

    fetchPostes();
  }, []);

  const handlePostuler = (id: number) => {
    router.push(`/front-office/postuler/post/${id}`); // Redirection vers le formulaire
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {postes.map((poste) => (
        <Card key={poste.id}>
          <CardHeader>
            <h3 className="text-lg font-bold">{poste.titre}</h3>
            <p className="text-sm text-muted-foreground">{poste.departement}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{poste.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handlePostuler(poste.id)}>Postuler</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
