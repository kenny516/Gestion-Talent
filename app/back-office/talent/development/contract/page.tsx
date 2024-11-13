import { ContractForm } from "@/components/forms/contract-form"
import { PageHeader } from "@/components/page-header"

export default function ContractPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contract Initiation"
        description="Generate trial contract for selected candidate"
      />
      <ContractForm />
    </div>
  )
}