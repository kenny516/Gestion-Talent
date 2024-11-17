import React, { useState } from "react";
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
import Link from "next/link";
import { Candidat } from "@/types";
import { PageHeader } from "@/components/page-header";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { Plus, Search } from "lucide-react";

const CandidatTable = ({
  title,
  description,
  candidats,
  loading,
}: {
  title: string;
  description: string;
  candidats: Candidat[];
  loading: boolean;
}) => {
  const [posteSearch, setPosteSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const filteredEmployees = candidats.filter((candidat) =>
    candidat.prenom?.toLowerCase().includes(posteSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedCandidates = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
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
                  Nouveau candidat
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

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-muted/50">
                  <TableHead className="font-semibold text-muted-foreground">
                    Nom
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Prénom
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Téléphone
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <SkeletonGeneralise rows={5} cols={8} />
                ) : (
                  paginatedCandidates.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {candidate.nom}
                      </TableCell>
                      <TableCell>{candidate.prenom}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {candidate.email}
                      </TableCell>
                      <TableCell>{candidate.telephone || "N/A"}</TableCell>
                      <TableCell>
                        <Link
                          href={`/back-office/talent/identification/candidats/${candidate.id}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-muted"
                          >
                            Voir détails
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-background hover:bg-muted"
            >
              Précédent
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-background hover:bg-muted"
            >
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatTable;
