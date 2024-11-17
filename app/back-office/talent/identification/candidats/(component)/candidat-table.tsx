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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Candidat } from "@/types";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { getStatusColor } from "@/components/ui/code-color";
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
  const [selectedStatus, setSelectedStatus] = useState<
    "En attente" | "Retenu" | "Refusé" | "Tous"
  >("Tous");
  const [posteSearch, setPosteSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredCandidates = candidats.filter((candidate) => {
    const firstPostulation = candidate.postulations?.[0];
    return (
      (selectedStatus === "Tous" || firstPostulation?.status === selectedStatus) &&
      firstPostulation?.poste?.departement
        ?.toLowerCase()
        .includes(posteSearch.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
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

              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(
                    value as "En attente" | "Retenu" | "Refusé" | "Tous"
                  )
                }
              >
                <SelectTrigger className="w-40 bg-background border-input">
                  <SelectValue placeholder="Filtrer par status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Retenu">Retenu</SelectItem>
                  <SelectItem value="Refusé">Refusé</SelectItem>
                </SelectContent>
              </Select>
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
                    Date de candidature
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Poste
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Status
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
                      <TableCell>{candidate.postulations[0].datePostulation+""}</TableCell>
                      <TableCell>
                        {candidate.postulations[0].poste?.departement || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            candidate.postulations[0].status || "En attente"
                          )}`}
                        >
                          {candidate.postulations[0].status || "En attente"}
                        </Badge>
                      </TableCell>
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
