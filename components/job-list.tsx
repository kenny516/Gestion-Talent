"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Building2 } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "Tech Solutions",
    location: "Paris",
    type: "CDI",
    posted: "Il y a 2 jours",
    skills: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    title: "Chef de Projet IT",
    company: "Digital Agency",
    location: "Lyon",
    type: "CDI",
    posted: "Il y a 5 jours",
    skills: ["Agile", "Scrum", "JIRA"],
  },
]

export function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {job.posted}
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <Button>Postuler</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}