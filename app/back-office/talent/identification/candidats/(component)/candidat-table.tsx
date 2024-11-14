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
import { Candidat } from "@/types";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { getStatusColor } from "@/components/ui/code-color";

export default function CandidatTable({
  title,
  description,
  candidats,
  loading,
}: {
  title: string;
  description:string,
  candidats: Candidat[];
  loading: boolean;
}) {
  const [selectedStatus, setSelectedStatus] = useState<
    "En attente" | "Retenu" | "Refusé" | "Tous"
  >("Tous");

  // Filter candidates based on selected status
  const filteredCandidates =
    selectedStatus === "Tous"
      ? candidats
      : candidats.filter((candidate) => candidate.status === selectedStatus);

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
      />
      <Card>
        <CardHeader className="flex gap-5">
          <Link href="/back-office/talent/identification/candidats/new">
            <Button variant="default" size="sm">
              Nouveau candidat
            </Button>
          </Link>
          {/* Select for status filtering */}
          <select
            title="status"
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(
                e.target.value as "En attente" | "Retenu" | "Refusé" | "Tous"
              )
            }
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tous">Tous</option>
            <option value="En attente">En attente</option>
            <option value="Retenu">Retenu</option>
            <option value="Refusé">Refusé</option>
          </select>
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
              {loading ? (
                <SkeletonGeneralise rows={5} cols={8} />
              ) : (
                filteredCandidates.map((candidate) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
