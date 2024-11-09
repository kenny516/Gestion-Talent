import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Users, UserPlus, GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Talent Management System</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Streamline your talent identification, acquisition, and development processes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <Users className="h-12 w-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Identification</h2>
          <p className="text-muted-foreground mb-4">
            Define requirements and search for internal talent
          </p>
          <Button asChild className="w-full">
            <Link href="/talent/identification">Get Started</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <UserPlus className="h-12 w-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Acquisition</h2>
          <p className="text-muted-foreground mb-4">
            Create job postings and manage applications
          </p>
          <Button asChild className="w-full">
            <Link href="/talent/acquisition">Get Started</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <GraduationCap className="h-12 w-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Development</h2>
          <p className="text-muted-foreground mb-4">
            Evaluate candidates and manage contracts
          </p>
          <Button asChild className="w-full">
            <Link href="/talent/development">Get Started</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}