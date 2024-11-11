"use client";
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
import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchCandidates = async (): Promise<Candidat[]> => {
  try {
    const response = await axios.get(api_url + "candidat");
    const data: Candidat[] = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);

  useEffect(() => {
    const getCandidates = async () => {
      const data = await fetchCandidates();
      setCandidates(data);
    };
    getCandidates();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex gap-5">
          <CardTitle>Liste des Candidats</CardTitle>
          <Link href={`/talent/identification/candidates/new`}>
            <Button variant="default" size="sm">
              new candidat
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.nom}</TableCell>
                  <TableCell>{candidate.prenom}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.telephone}</TableCell>
                  <TableCell>{candidate.dateCandidature}</TableCell>
                  <TableCell>{candidate.poste.departement}</TableCell>
                  <TableCell>
                    <Link href={`candidates/${candidate.id}`}>
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
