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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import { getStatusColor } from "@/components/ui/code-color";
import { Search } from "lucide-react";
import { api_url, Conge } from "@/types";
import axios from "axios";

export default function CongeTable() {
  const [selectedStatus, setSelectedStatus] = useState<
    "En attente" | "Termine" | "Tous" | "En cours"
  >("Tous");
  const [posteSearch, setPosteSearch] = useState<string>("");
  const [employeSearch, setEmployeSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [conges, setConges] = useState<Conge[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchConges = async () => {
      try {
        const response = await axios.get(api_url + "conge");
        setConges(response.data as Conge[]);
        console.log(JSON.stringify(response));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching conges:", error);
        setLoading(false);
      }
    };
    fetchConges();
  }, []);

  const filteredConges = conges.filter((conge) => {
    return (
      (selectedStatus === "Tous" || conge.status === selectedStatus) &&
/*      conge.employe.Contrat?.poste.titre
        .toLowerCase()
        .includes(posteSearch.toLowerCase()) &&*/
      conge.employe.nom.toLowerCase().includes(employeSearch.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredConges.length / itemsPerPage);
  const paginatedConges = filteredConges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <PageHeader title={"Conge"} description={"Liste de conge des employe"} />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(value as "En attente" | "Termine" | "Tous" | "En cours")
                }
              >
                <SelectTrigger className="w-40 bg-background border-input">
                  <SelectValue placeholder="Filtrer par status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Termine">Terminé</SelectItem>
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
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom"
                value={employeSearch}
                onChange={(e) => {
                  setEmployeSearch(e.target.value);
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
                    Date début
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Date fin
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Durée
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
                  <SkeletonGeneralise rows={6} cols={8} />
                ) : (
                  paginatedConges.map((conge) => (
                    <TableRow
                      key={conge.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {conge.employe.nom}
                      </TableCell>
                      <TableCell>{conge.employe.prenom}</TableCell>
                      <TableCell>{conge.dateDebut}</TableCell>
                      <TableCell>{conge.dateFin}</TableCell>
                      <TableCell>{conge.duree}</TableCell>
                      <TableCell>{conge.employe?.contrat?.poste?.titre}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(conge.status)}`}
                        >
                          {conge.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/back-office/gestion/conge/${conge.id}`}>
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
}
