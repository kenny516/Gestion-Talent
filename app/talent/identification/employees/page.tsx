"use client";
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
import { api_url, Employe } from "@/types";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";

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

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    getEmployees();
  }, []);


  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des employés"
        description="Liste des employés avec leurs compétences et informations de poste"
      />
      <Card>
        <CardHeader className="flex gap-5">
          <CardTitle>Liste des Employés</CardTitle>
          <Link href={`/talent/identification/employees/new`}>
            <Button variant="default" size="sm">
              Nouvel employé
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date de candidature</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Compétences</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employe) => (
                <TableRow key={employe.id}>
                  <TableCell>{employe.nom}</TableCell>
                  <TableCell>{employe.prenom}</TableCell>
                  <TableCell>{employe.email}</TableCell>
                  <TableCell>{employe.telephone || "N/A"}</TableCell>
                  <TableCell>{employe.dateEmbauche || "N/A"}</TableCell>
                  <TableCell>{employe.poste?.departement || "N/A"}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}