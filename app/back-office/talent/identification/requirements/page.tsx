import { ProfileRequirementsForm } from "@/components/forms/profile-requirements-form"
import { PageHeader } from "@/components/page-header"

export default function ProfileRequirementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Requirements Setup"
        description="Define the requirements for your ideal candidate profile"
      />
      <ProfileRequirementsForm />
    </div>
  )
}