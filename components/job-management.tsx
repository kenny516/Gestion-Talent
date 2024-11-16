"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, MoreHorizontal } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Développeur Full Stack",
    department: "Tech",
    location: "Paris",
    applications: 12,
    status: "Active",
    posted: "2024-01-15",
  },
  {
    id: 2,
    title: "Chef de Projet IT",
    department: "Tech",
    location: "Lyon",
    applications: 8,
    status: "Active",
    posted: "2024-01-18",
  },
]

export function JobManagement() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Offres d'emploi</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle offre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle offre d'emploi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du poste</Label>
                  <Input id="title" placeholder="ex: Développeur Full Stack" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  <Input id="department" placeholder="ex: Tech" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input id="location" placeholder="ex: Paris" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type de contrat</Label>
                  <Input id="type" placeholder="ex: CDI" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description du poste</Label>
                <Textarea id="description" rows={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Prérequis</Label>
                <Textarea id="requirements" rows={3} />
              </div>
              <Button className="w-full">Publier l'offre</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Candidatures</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell>
                  <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.posted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}