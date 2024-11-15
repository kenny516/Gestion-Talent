import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateForm } from "@/components/forms/candidate-form";
import { PageHeader } from "@/components/page-header";

export default function NewCandidatePage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        title="Ajout d'un candidat"
        description="Formulaire d'ajout candidat"
      />
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
