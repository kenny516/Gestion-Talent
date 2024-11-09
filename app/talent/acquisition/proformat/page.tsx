'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Define types for the proforma data
interface Proforma {
  jobTitle: string;
  description: string;
  skillsRequired: string[];
  experience: string;
  education: string;
  location: string;
}

const exampleProforma: Proforma = {
  jobTitle: "Software Engineer",
  description: "We are looking for a talented Software Engineer with expertise in React.js.",
  skillsRequired: [
    "React.js",
    "Node.js",
    "JavaScript",
    "CSS",
    "HTML",
  ],
  experience: "3+ years of experience in full-stack development",
  education: "Bachelor's degree in Computer Science or equivalent",
  location: "Remote",
}

export function ProformaDisplay() {
  const [proforma, setProforma] = useState<Proforma>(exampleProforma)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetching the proforma data (you can replace this with an API call)
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProforma(exampleProforma)
      } catch (error) {
        setError(error+"Failed to load proforma data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  function handleApply() {
    toast.success("Application link clicked!")
    // You can redirect to the application form page here
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold">{proforma.jobTitle}</h2>
      <p className="mt-2 text-lg">{proforma.description}</p>

      <div className="mt-4">
        <h3 className="font-medium">Skills Required:</h3>
        <ul className="list-disc pl-5">
          {exampleProforma.skillsRequired.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p><strong>Experience:</strong> {proforma.experience}</p>
        <p><strong>Education:</strong> {proforma.education}</p>
        <p><strong>Location:</strong> {proforma.location}</p>
      </div>

      <Button onClick={handleApply} className="mt-4">Apply Now</Button>
    </Card>
  )
}
