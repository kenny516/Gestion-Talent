import { InternalSearch } from "@/components/internal-search"
import { PageHeader } from "@/components/page-header"

export default function InternalSearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Profile Search"
        description="Search for internal candidates matching your requirements"
      />
      <InternalSearch />
    </div>
  )
}