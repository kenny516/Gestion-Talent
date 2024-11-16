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
import Link from "next/link";
import { api_url, Employe } from "@/types";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SkeletonGeneralise from "@/components/ui/skeleton-generalise-table";

// Function to fetch employees from the API
const fetchEmployees = async (): Promise<Employe[]> => {
  try {
    const response = await fetch(api_url + "employe"); // Adjust this URL to your actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data: Employe[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
};

export default function EmployeesPage() {
  // State to store employees
  const [employees, setEmployees] = useState<Employe[]>([]);
  const [posteSearch, setPosteSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const filteredEmployees = employees.filter((employe) =>
    employe.poste?.titre.toLowerCase().includes(posteSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedCandidates = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
      setLoading(false);
    };
    getEmployees();
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
          {/*}<div className="flex items-center gap-4">
              <Link href={`/talent/identification/employees/new`}>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  Nouvel employé
                </Button>
              </Link>
            </div>{*/}
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date de candidature</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Departement</TableHead>
                  <TableHead>Compétences</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <SkeletonGeneralise rows={5} cols={9} />
                ) : (
                  paginatedCandidates.map((employe) => (
                    <TableRow key={employe.id}>
                      <TableCell>{employe.nom}</TableCell>
                      <TableCell>{employe.prenom}</TableCell>
                      <TableCell>{employe.email}</TableCell>
                      <TableCell>{employe.telephone || "N/A"}</TableCell>
                      <TableCell>{employe.dateEmbauche || "N/A"}</TableCell>
                      <TableCell>{employe.poste?.titre || "N/A"}</TableCell>
                      <TableCell>
                        {employe.poste?.departement || "N/A"}
                      </TableCell>
                      <TableCell>
                        {employe.competences && employe.competences.length > 0
                          ? employe.competences.map((comp) => (
                              <div key={comp.id}>{comp.nom}</div>
                            ))
                          : "Aucune compétence"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link href={`employees/${employe.id}`}>
                            <Button variant="outline" size="sm">
                              Voir détails
                            </Button>
                          </Link>
                        </div>
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
