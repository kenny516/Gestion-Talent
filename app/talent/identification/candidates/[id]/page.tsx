import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidat } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Function to fetch candidate details by ID from the API
const getCandidate = async (id: string): Promise<Candidat | null> => {
  try {
    const response = await fetch(`/api/candidates/${id}`);
    if (!response.ok) {
      throw new Error("Candidate not found");
    }
    const data: Candidat = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function generateStaticParams() {
  // Return static params for each candidate ID from your data or API.
  // If you want to pre-render pages based on a list of candidates, update this to fetch the list of candidates.
  return [];
}

export default async function CandidateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const candidate = await getCandidate(params.id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Détails du Candidat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Informations Personnelles</h3>
              <dl className="mt-4 space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nom</dt>
                  <dd className="mt-1">{candidate.nom}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Prénom</dt>
                  <dd className="mt-1">{candidate.prenom}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1">{candidate.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Téléphone
                  </dt>
                  <dd className="mt-1">{candidate.telephone}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold">Compétences</h3>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Détails du poste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{candidate.poste.titre}</h3>
                      <p className="text-muted-foreground">
                        {candidate.poste.departement}
                      </p>
                    </div>
                    <p className="text-sm">{candidate.poste.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Link href={`/talent/identification/candidates`}>
        <Button variant="outline" size="sm">
          retour
        </Button>
      </Link>
    </div>
  );
}
