import { CandidateList } from "@/components/candidate-list"
import { PageHeader } from "@/components/page-header"

export default function CandidateFilterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Selection"
        description="Review and filter evaluated candidates"
      />
      <CandidateList />
    </div>
  )
}