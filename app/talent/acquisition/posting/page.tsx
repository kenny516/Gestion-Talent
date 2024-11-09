import { JobPostingForm } from "@/components/forms/job-posting-form"
import { PageHeader } from "@/components/page-header"

export default function JobPostingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Job Posting"
        description="Create a new job posting based on profile requirements"
      />
      <JobPostingForm />
    </div>
  )
}