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
import { api_url, Candidat } from "@/types";
import axios from "axios";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";

// Fetch candidates
const fetchCandidates = async (): Promise<Candidat[]> => {
  try {
    const response = await axios.get(api_url + "candidat");
    return response.data as Candidat[];
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

// Function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Retenu":
      return "bg-green-500 text-white";
    case "Refusé":
      return "bg-red-500 text-white";
    case "En attente":
    default:
      return "bg-yellow-500 text-white";
  }
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCandidates = async () => {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
      setLoading(false);
    };
    getCandidates();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des candidats"
        description="Liste des candidats ayant postulé à une offre"
      />
      <Card>
        <CardHeader className="flex gap-5">
          <CardTitle>Liste des Candidats</CardTitle>
          <Link href="/back-office/talent/identification/candidats/new">
            <Button variant="default" size="sm">
              Nouveau candidat
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date de candidature</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ?(
                    <SkeletonGeneralise rows={5} cols={8}/>
                )
                : candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>{candidate.nom}</TableCell>
                      <TableCell>{candidate.prenom}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.telephone || "N/A"}</TableCell>
                      <TableCell>{candidate.dateCandidature}</TableCell>
                      <TableCell>
                        {candidate.poste?.departement || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            candidate.status || "En attente"
                          )}
                        >
                          {candidate.status || "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/back-office/talent/identification/candidats/${candidate.id}`}
                        >
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
