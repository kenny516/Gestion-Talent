import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api_url, CandidaturData } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Award, Building2, Calendar, ClipboardList, Mail, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Function to fetch candidate details by ID from the API
const getCandidate = async (id: string): Promise<CandidaturData | null> => {
  try {
    const response = await fetch(api_url + `candidat/${id}`);
    if (!response.ok) {
      throw new Error("Candidate not found");
    }
    const data: CandidaturData = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getStatusColor = (status: string) => {
    switch (status) {
      case "Retenu":
        return "bg-green-500 text-white";
      case "Refusé":
        return "bg-red-500 text-white";
      case "En attente":
      default:
        return "bg-yellow-500 text-white";
    }
  };

export default async function CandidateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch candidate data
  let candidate = await getCandidate(params.id);

  // Set default values if the candidate is not found
  if (!candidate) {
    candidate = {
      id: 0,
      nom: "Non trouvé",
      prenom: "Inconnu",
      email: "non.trouve@email.com",
      telephone: "0000000000",
      dateCandidature: "00000000",
      poste: {
        id: 0,
        titre: "Non spécifié",
        description: "Aucune description disponible.",
        departement: "Non spécifié",
      },
      competences: [],
      notes: [],
      status: "En attente",
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Détails du Candidat"
          description="Details concernant le candidat"
        />
        <Link href={`/back-office/talent/identification/candidats`}>
          <Button variant="outline" size="sm">
            ← Retour à la liste
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="font-medium">{`${candidate.prenom} ${candidate.nom}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{candidate.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{candidate.telephone || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Date de candidature
                  </p>
                  <p className="font-medium">
                    {new Date(candidate.dateCandidature).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Badge
                  className={`${getStatusColor(candidate.status || "En attente")} px-3 py-1`}
                >
                  {candidate.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Job Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Poste Concerné
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">
                  {candidate.poste.titre}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Département: {candidate.poste.departement}
                </p>
                <p className="mt-4">{candidate.poste.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Competences Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Compétences
                  </h4>
                  {candidate.competences.length > 0 ? (
                    <div className="space-y-2">
                      {candidate.competences.map((comp) => (
                        <div
                          key={comp.id}
                          className="flex items-center justify-between bg-secondary/20 p-2 rounded"
                        >
                          <span>{comp.nom}</span>
                          <Badge variant="secondary">
                            Niveau: {comp.niveau}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Aucune compétence disponible.
                    </p>
                  )}
                </div>

                {/* Notes Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Notes
                  </h4>
                  {candidate.notes.length > 0 ? (
                    <div className="space-y-2">
                      {candidate.notes.map((note) => (
                        <div
                          key={note.idCandidat}
                          className="bg-secondary/20 p-2 rounded"
                        >
                          <p className="text-sm font-medium">
                            {note.typeNote.nomType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {note.note ?? "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Aucune note disponible.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
