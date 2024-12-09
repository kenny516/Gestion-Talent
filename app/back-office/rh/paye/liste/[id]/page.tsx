"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import axios from "axios";
import { api_url, PaieType } from "@/types";
import Link from "next/link";

export default function AvancePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [id, setId] = useState<number | null>(null);
  const [paies, setPaies] = useState<PaieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchPaies = async () => {
      try {
        const response = await axios.get(`${api_url}paye/${id}`);
        setPaies(response.data as PaieType[]);
      } catch (error) {
        console.error("Error fetching paies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaies();
  }, [id]);

  const sortedPaies = [...paies].sort((a, b) => {
    if (b.annee !== a.annee) return b.annee - a.annee;
    return b.mois - a.mois;
  });

  const totalPages = Math.ceil(sortedPaies.length / itemsPerPage);
  const paginatedPaies = sortedPaies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const getMonthName = (monthNumber: number): string => {
    const date = new Date(2000, monthNumber - 1);
    const monthName = new Intl.DateTimeFormat("fr-FR", {
      month: "long",
    }).format(date);
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  return (
    <div className="space-y-6 p-10">
      <PageHeader
        title="Liste des paies"
        description="Affiche la liste des paies d'un employé."
      />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Uncomment and adapt search logic if needed */}
            {/* <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom ou prénom"
                value={paieSearch}
                onChange={(e) => {
                  setPaieSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 bg-background border-input"
              />
            </div> */}
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mois</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Heures normales</TableHead>
                <TableHead>Heures supplémentaires</TableHead>
                <TableHead>Avance</TableHead>
                <TableHead>Salaire de base</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonGeneralise rows={5} cols={7} />
              ) : (
                paginatedPaies.map((paie, index) => (
                  <TableRow key={`${paie.annee}-${paie.mois}-${index}`}>
                    <TableCell>{getMonthName(paie.mois)}</TableCell>
                    <TableCell>{paie.annee}</TableCell>
                    <TableCell>{paie.heureNormale}</TableCell>
                    <TableCell>{paie.heureSup}</TableCell>
                    <TableCell>{paie.avance.toLocaleString("fr-FR")}</TableCell>
                    <TableCell>
                      {paie.salaireBase.toLocaleString("fr-FR")}
                    </TableCell>
                    <TableCell>{paie.total.toLocaleString("fr-FR")}</TableCell>
                    <TableCell>
                        <Link href={`/back-office/rh/paye/detail/${paie.id}`}>
                          <Button
                            variant="default"
                            size="sm"
                            className="hover:bg-muted"
                          >
                            details
                          </Button>
                        </Link>
                      </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </Button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
