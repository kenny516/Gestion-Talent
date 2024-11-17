import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateForm } from "@/components/forms/candidate-form";
import { PageHeader } from "@/components/page-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewCandidatePage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Ajout d'un candidat"
          description="Formulaire d'ajout candidat"
        />
        <Link href={`/back-office/talent/identification/candidats`}>
          <Button variant="outline" size="sm">
            ← Retour à la liste
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Candidature</CardTitle>
        </CardHeader>
        <CardContent>
          <CandidateForm />
        </CardContent>
      </Card>
    </div>
  );
}
