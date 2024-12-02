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
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { Link, Plus, Search } from "lucide-react";
import axios from "axios";
import { api_url, PaieType } from "@/types"; // Ensure the type is imported correctly

export default function AvancePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [id, setId] = useState<number | null>(null);
  const [paies, setPaies] = useState<PaieType[]>([]); // Explicitly type the state
  const [loading, setLoading] = useState(true);
  const [paieSearch, setPaieSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Await the params Promise
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    // Fetch avances from the API
    const fetchPaies = async () => {
      try {
        const response = await axios.get(api_url + `paye/${id}`); // Adjust this URL to your actual API endpoint
        setPaies(response.data as PaieType[]); // Explicitly cast the response data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching paies :", error);
      }
    };

    fetchPaies();
  }, [id]);

  paies.sort((a, b) => {
    if (b.annee !== a.annee) {
      return b.annee - a.annee; // Sort by annee descending
    }
    return b.mois - a.mois; // If annee is equal, sort by mois descending
  });

  // Pagination calculations
  const totalPages = Math.ceil(paies.length / itemsPerPage);
  const paginatedAvances = paies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  function getMonthName(monthNumber: number): string {
    const date = new Date(2000, monthNumber - 1); // Months are 0-indexed
    const monthName = new Intl.DateTimeFormat("fr-FR", {
      month: "long",
    }).format(date);
    return monthName.charAt(0).toUpperCase() + monthName.slice(1); // Capitalize the first letter
  }

  return (
    <div className="space-y-6 p-10">
      <PageHeader
        title="Liste des paies"
        description="Affiche la liste des paies d'un employé."
      />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom ou prénom"
                value={avanceSearch}
                onChange={(e) => {
                  setAvanceSearch(e.target.value);
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonGeneralise rows={5} cols={7} />
              ) : (
                paies.map((paie) => (
                  <TableRow>
                    <TableCell>{getMonthName(paie.mois)}</TableCell>
                    <TableCell>{paie.annee}</TableCell>
                    <TableCell>{paie.heureNormale}</TableCell>
                    <TableCell>{paie.heureSup}</TableCell>
                    <TableCell>{paie.avance.toLocaleString("fr-FR")}</TableCell>
                    <TableCell>
                      {paie.salaireBase.toLocaleString("fr-FR")}
                    </TableCell>
                    <TableCell>{paie.total.toLocaleString("fr-FR")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination controls */}
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
