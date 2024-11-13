import { ApplicationForm } from "@/components/forms/application-form"
import { PageHeader } from "@/components/page-header"

export default function ApplicationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Application"
        description="Apply for an open position"
      />
      <ApplicationForm />
    </div>
  )
}