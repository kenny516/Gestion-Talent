"use client"
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
import { Candidat, Employe } from "@/types";
import { useEffect, useState } from "react";

// Function to fetch employees from the API
const fetchemployees = async (): Promise<Candidat[]> => {
  try {
    const response = await fetch("/api/employees"); // Adjust this URL to your actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data: Candidat[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
};

export default function EmployeesPage() {
  // State to store employees
  const [employees, setemployees] = useState<Candidat[]>([]);
  const employess :Employe[] = [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@email.com",
      telephone: "0123456789",
      date_embauche: "2024-03-20",
      poste: {
          id: 1,
          titre: "Développeur Fullstack",
          description:
              "Développ des applications web et mobiles en utilisant des technologies modernes et évolutives.",
          departement: "Développement"
      }
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@email.com",
      telephone: "0987654321",
      date_embauche: "2024-03-19",
      poste: {
          id: 1,
          titre: "Développeur Fullstack",
          description:
              "Développ des applications web et mobiles en utilisant des technologies modernes et évolutives.",
          departement: "Développement"
      }
    }
  ];

  // Fetch employees when the component mounts
  useEffect(() => {
    const getemployees = async () => {
      const data = await fetchemployees();
      setemployees(data); // Set the employees data in the state
    };
    getemployees(); // Call the function to fetch data
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Liste des Candidats</CardTitle>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employess.map((employe) => (
                <TableRow key={employe.id}>
                  <TableCell>{employe.nom}</TableCell>
                  <TableCell>{employe.prenom}</TableCell>
                  <TableCell>{employe.email}</TableCell>
                  <TableCell>{employe.telephone}</TableCell>
                  <TableCell>{employe.date_embauche}</TableCell>
                  <TableCell>{employe.poste.departement}</TableCell>
                  <TableCell>
                    <Link href={`employees/${employe.id}`}>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Link href={`/talent/identification/employees/new`}>
        <Button variant="default" size="sm">
          new candidat
        </Button>
      </Link>
    </div>
  );
}
