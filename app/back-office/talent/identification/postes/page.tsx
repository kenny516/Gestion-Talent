"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { api_url, Poste } from "@/types";
import { PageHeader } from "@/components/page-header";

export default function PostesPage() {
  const [postes, setPostes] = useState<Poste[]>([]);

  // Fetch postes from the API
  const fetchPostes = async () => {
    try {
      const response = await axios.get(api_url + "poste"); // Adjust this URL to your actual API endpoint
      setPostes(response.data);
    } catch (error) {
      console.error("Error fetching postes:", error);
    }
  };

  useEffect(() => {
    fetchPostes();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des Postes"
        description="Affiche la liste des postes disponibles dans l'entreprise."
      />

      <Card>
        <CardHeader className="flex gap-5">
          <CardTitle>Liste des Postes</CardTitle>
          <Link href={`/back-office/talent/identification/postes/new`}>
            <Button variant="default" size="sm">
              Nouveau Poste
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postes.map((poste) => (
                <TableRow key={poste.id}>
                  <TableCell>{poste.titre}</TableCell>
                  <TableCell>{poste.description}</TableCell>
                  <TableCell>{poste.departement}</TableCell>
                  <TableCell>
                    <Link href={`/back-office/postes/${poste.id}`}>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
