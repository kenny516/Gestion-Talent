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
import axios from "axios";
import { api_url } from "@/types";
import { PageHeader } from "@/components/page-header";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface HeureSup {
  id: number;
  employe_nom: string; // Nom de l'employé uniquement
  date_debut: string;
  date_fin: string;
  total_heures_sup: number | null;
  montant: number | null;
}

export default function HeuresSupPage() {
  const [heuresSup, setHeuresSup] = useState<HeureSup[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch heures supplémentaires from the API
  const fetchHeuresSup = async () => {
    try {
      const response = await axios.get(api_url + "heures-sup/after-today");
      // Mappage des données pour ne garder que le nom de l'employé
      const mappedData = response.data.map((heure: any) => ({
        id: heure.id,
        employe_nom: heure.employe.nom, // Utilisation du nom de l'employé
        date_debut: heure.dateDebut,
        date_fin: heure.dateFin,
        total_heures_sup: heure.totalHeuresSup,
        montant: heure.montant,
      }));
      setHeuresSup(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching heures sup:", error);
    }
  };

  useEffect(() => {
    fetchHeuresSup();
  }, []);

  // Filter heures sup based on search term
  const filteredHeuresSup = heuresSup.filter((heure) =>
    heure.employe_nom.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredHeuresSup.length / itemsPerPage);
  const paginatedHeuresSup = filteredHeuresSup.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-10 p-10">
      <PageHeader
        title="Heures Supplémentaires à Venir"
        description="Liste des heures supplémentaires prévues pour les employés."
      />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Link href="/back-office/heures-sup/creer" passHref>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  Nouveau heure supplémentaire
                </Button>
              </Link>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un employé"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 bg-background border-input"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Date Début</TableHead>
                <TableHead>Date Fin</TableHead>
                <TableHead>Total Heures Sup</TableHead>
                <TableHead>Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonGeneralise rows={5} cols={5} />
              ) : (
                paginatedHeuresSup.map((heure) => (
                  <TableRow key={heure.id}>
                    <TableCell>{heure.employe_nom}</TableCell>
                    <TableCell>{new Date(heure.date_debut).toLocaleString()}</TableCell>
                    <TableCell>{new Date(heure.date_fin).toLocaleString()}</TableCell>
                    <TableCell>{heure.total_heures_sup?.toFixed(2)} h</TableCell>
                    <TableCell>{heure.montant ? heure.montant.toFixed(2) : "N/A"} €</TableCell>
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
