"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { api_url, Poste } from "@/types";
import { PageHeader } from "@/components/page-header";

export default function NewPostePage() {
  const [poste, setPoste] = useState<Partial<Poste>>({
    titre: "",
    description: "",
    departement: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPoste((prevPoste) => ({
      ...prevPoste,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${api_url}/poste`, poste);
      alert("Poste ajouté avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'ajout du poste :", error);
      alert("Erreur lors de l'ajout du poste. Veuillez réessayer.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creation de poste"
        description="Cree un nouveau poste"
      />
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un Nouveau Poste</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                value={poste.titre}
                onChange={handleChange}
                placeholder="Titre du poste"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={poste.description}
                onChange={handleChange}
                placeholder="Description du poste"
                required
                className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
              />
            </div>
            <div>
              <Label htmlFor="departement">Département</Label>
              <Input
                id="departement"
                name="departement"
                value={poste.departement}
                onChange={handleChange}
                placeholder="Département"
                required
              />
            </div>
            <Button type="submit" variant="default">
              Ajouter le poste
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
