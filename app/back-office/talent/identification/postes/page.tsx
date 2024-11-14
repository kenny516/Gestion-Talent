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
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PostesPage() {
  const [postes, setPostes] = useState<Poste[]>([]);
  const [loading, setLoading] = useState(true);
  const [posteSearch, setPosteSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch postes from the API
  const fetchPostes = async () => {
    try {
      const response = await axios.get(api_url + "poste"); // Adjust this URL to your actual API endpoint
      setPostes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching postes:", error);
    }
  };

  useEffect(() => {
    fetchPostes();
  }, []);

  // Filter postes based on search term
  const filteredPostes = postes.filter((poste) =>
    poste.titre.toLowerCase().includes(posteSearch.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredPostes.length / itemsPerPage);
  const paginatedPostes = filteredPostes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des Postes"
        description="Affiche la liste des postes disponibles dans l'entreprise."
      />
      <Card className="bg-card text-card-foreground shadow">
      <CardHeader className="border-b border-border">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Link href="/back-office/talent/identification/candidats/new">
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
                placeholder="Rechercher par poste"
                value={posteSearch}
                onChange={(e) => {
                  setPosteSearch(e.target.value);
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
                <TableHead>Titre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonGeneralise rows={5} cols={4} />
              ) : (
                paginatedPostes.map((poste) => (
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
