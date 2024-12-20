"use client";

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
import { api_url, Employe, CategoriePersonnel } from "@/types";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to fetch employees from the API
const fetchEmployees = async (): Promise<Employe[]> => {
  try {
    const response = await fetch(api_url + "employe");
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data: Employe[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to fetch categories personnel from the API
const fetchCategs = async (): Promise<CategoriePersonnel[]> => {
  try {
    const response = await fetch(api_url + "employe/categories-personnel");
    if (!response.ok) {
      throw new Error("Failed to fetch categories personnel");
    }
    const data: CategoriePersonnel[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function EmployeesPage() {
  // States
  const [employees, setEmployees] = useState<Employe[]>([]);
  const [categPersonnel, setCategPersonnel] = useState<CategoriePersonnel[]>(
    []
  );
  const [posteSearch, setPosteSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [currentCategIndex, setCurrentCategIndex] = useState<number>(0);
  const itemsPerPage = 10;

  // Apply combined search and category filtering
  const filteredEmployees = employees.filter((employe) => {
    const matchesSearch = employe?.contrat?.poste.titre
      .toLowerCase()
      .includes(posteSearch.toLowerCase());
    const matchesCategory =
      currentCategIndex === 0 ||
      employe?.contrat?.poste.categoriePersonnel.id === currentCategIndex;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedCandidates = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch data on mount
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [employeesData, categsData] = await Promise.all([
        fetchEmployees(),
        fetchCategs(),
      ]);
      setEmployees(employeesData);
      setCategPersonnel(categsData);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des employés"
        description="Liste des employés avec leurs compétences et informations de poste"
      />
      <Card className="bg-card text-card-foreground shadow">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
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
            {/* Category Filter */}
            <div className="relative w-full sm:w-64">
              <Select
                onValueChange={(value) => {
                  setCurrentCategIndex(Number(value));
                  setCurrentPage(1); // Reset to the first page
                }}
              >
                <SelectTrigger aria-label="Filtrer par catégorie">
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="0" value="0">
                    Toutes les catégories
                  </SelectItem>

                  {categPersonnel.map((categ: CategoriePersonnel) => (
                    <SelectItem key={categ.id} value={categ.id.toString()}>
                      {categ.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentCategIndex !== 0 && (
                <div className="text-sm text-muted-foreground mt-1">
                  Filtre actuel :{" "}
                  {categPersonnel.find(
                    (categ) => categ.id === currentCategIndex
                  )?.nom || "Inconnu"}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date d embauche</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>liste paye</TableHead>
                  <TableHead>paye</TableHead>
                  <TableHead>vers details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <SkeletonGeneralise rows={5} cols={9} />
                ) : paginatedCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Aucun employé trouvé pour ce filtre.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCandidates.map((employe) => (
                    <TableRow key={employe.id}>
                      <TableCell>{employe.nom}</TableCell>
                      <TableCell>{employe.prenom}</TableCell>
                      <TableCell>{employe.email}</TableCell>
                      <TableCell>{employe.telephone || "N/A"}</TableCell>
                      <TableCell>{employe.dateEmbauche || "N/A"}</TableCell>
                      <TableCell>
                        {employe?.contrat?.poste.titre || "N/A"}
                      </TableCell>
                      <TableCell>
                        {employe?.contrat?.poste.departement || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Link href={`/back-office/rh/paye/liste/${employe.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-muted"
                          >
                            liste paye
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/back-office/rh/paye/${employe.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-muted"
                          >
                            Paye
                          </Button>
                        </Link>
                      </TableCell>
											<TableCell>
                        <Link href={`/back-office/talent/identification/employees/${employe.id}`}>
                          <Button
                            variant="outline"
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
          </div>
          {/* Pagination */}
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
