import { CandidateEvaluationForm } from "@/components/forms/candidate-evaluation-form"
import { PageHeader } from "@/components/page-header"

export default function EvaluationPage() {
  return (
    <div className="space-y-6 container mx-auto">
      <PageHeader
        title="Candidate Evaluation"
        description="Evaluate candidate performance and qualifications"
      />
      <CandidateEvaluationForm />
    </div>
  )
}