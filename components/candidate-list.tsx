"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

// Mock data - replace with actual API call
const candidates = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior Developer",
    totalScore: 35,
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Product Manager",
    totalScore: 38,
    status: "selected",
  },
  // Add more mock candidates as needed
]

export function CandidateList() {
  return (
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Total Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.position}</TableCell>
              <TableCell>{candidate.totalScore}/40</TableCell>
              <TableCell>
                <Badge
                  variant={candidate.status === "selected" ? "default" : "secondary"}
                >
                  {candidate.status === "selected" ? "Selected" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-600"
                    onClick={() => console.log("Select candidate", candidate.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    onClick={() => console.log("Reject candidate", candidate.id)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}