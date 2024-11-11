import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateForm } from "@/components/candidates/candidate-form";

export default function NewCandidatePage() {
  return (
    <div className="container mx-auto py-10">
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