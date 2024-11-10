import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Candidat } from "@/types";

const candidates :Candidat[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "0123456789",
    date_candidature: "2024-03-20",
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
    date_candidature: "2024-03-19",
    poste: {
        id: 1,
        titre: "Développeur Fullstack",
        description:
            "Développ des applications web et mobiles en utilisant des technologies modernes et évolutives.",
        departement: "Développement"
    }
  }
];

export default function CandidatesPage() {
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
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.nom}</TableCell>
                  <TableCell>{candidate.prenom}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.telephone}</TableCell>
                  <TableCell>{candidate.date_candidature}</TableCell>
                  <TableCell>{candidate.poste.departement}</TableCell>
                  <TableCell>
                    <Link href={`candidates/${candidate.id}`}>
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
    </div>
  );
}