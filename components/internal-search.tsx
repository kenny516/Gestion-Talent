"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface Employee {
  id: number
  name: string
  role: string
  skills: string[]
  experience: string
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Developer",
    skills: ["React", "Node.js", "TypeScript"],
    experience: "5 years"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    skills: ["Agile", "Scrum", "Product Strategy"],
    experience: "7 years"
  }
]

export function InternalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Employee[]>([])

  const handleSearch = () => {
    const filtered = mockEmployees.filter(employee =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.skills.some(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    setResults(filtered)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex gap-4">
          <Input
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {results.map((employee) => (
          <Card key={employee.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.role}</p>
                <p className="text-sm mt-2">Experience: {employee.experience}</p>
                <div className="flex gap-2 mt-2">
                  {employee.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}