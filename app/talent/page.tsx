import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { 
  Users, 
  UserPlus, 
  GraduationCap,
  ChevronRight 
} from "lucide-react"

const features = [
  {
    title: "Talent Identification",
    description: "Define requirements and search for internal candidates",
    icon: Users,
    href: "/talent/identification"
  },
  {
    title: "Talent Acquisition",
    description: "Create job postings and manage applications",
    icon: UserPlus,
    href: "/talent/acquisition"
  },
  {
    title: "Talent Development",
    description: "Evaluate and manage candidate progress",
    icon: GraduationCap,
    href: "/talent/development"
  }
]

export default function TalentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Talent Management System"
        description="Streamline your talent identification, acquisition, and development processes"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.href} href={feature.href}>
              <Card className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}