import { JobPostingForm } from "@/components/forms/job-posting-form"
import { PageHeader } from "@/components/page-header"

export default function JobPostingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Creation de poste"
        description="Cree un nouveau poste"
      />
      <JobPostingForm />
    </div>
  )
}