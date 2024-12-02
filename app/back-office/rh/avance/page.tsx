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
import { api_url, AvanceImpaye } from "@/types"; // Ensure the type is imported correctly

export default function AvancePage() {
  const [avances, setAvances] = useState<AvanceImpaye[]>([]); // Explicitly type the state
  const [loading, setLoading] = useState(true);
  const [avanceSearch, setAvanceSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch avances from the API
  const fetchAvances = async () => {
    try {
      const response = await axios.get(api_url + "avance"); // Adjust this URL to your actual API endpoint
      setAvances(response.data as AvanceImpaye[]); // Explicitly cast the response data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching avances:", error);
    }
  };

  useEffect(() => {
    fetchAvances();
  }, []);

  // Filter avances based on search term
  const filteredAvances = avances.filter((avance) =>
    (avance.nom + " " + avance.prenom)
      .toLowerCase()
      .includes(avanceSearch.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredAvances.length / itemsPerPage);
  const paginatedAvances = filteredAvances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-6 p-10">
      <PageHeader
        title="Liste des Avances Impayées"
        description="Affiche la liste des avances en cours de paiement."
      />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <Link href="/back-office/talent/identification/postes/new">
                    <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2"
                    size="sm"
                    >
                    <Plus className="h-4 w-4" />
                Nouveau Poste
                </Button>
            </Link>
            </div>
            <div className="relative w-full sm:w-64">
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
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Pourcentage</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Reste à Payer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonGeneralise rows={5} cols={7} />
              ) : (
                paginatedAvances.map((avance) => (
                  <TableRow key={avance.id}>
                    <TableCell>{avance.nom}</TableCell>
                    <TableCell>{avance.prenom}</TableCell>
                    <TableCell>{avance.dateAvance}</TableCell>
                    <TableCell>{avance.montant.toLocaleString("fr-FR")}</TableCell>
                    <TableCell>{avance.pourcentageDebitable}%</TableCell>
                    <TableCell>{avance.raison}</TableCell>
                    <TableCell>
                      {avance.restePaye.toLocaleString("fr-FR")}
                    </TableCell>
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
