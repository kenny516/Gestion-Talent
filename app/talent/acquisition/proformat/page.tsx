"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";

// Define types for the proforma data
interface Proforma {
  jobTitle: string;
  description: string;
  skillsRequired: string[];
  experience: string;
  education: string;
  location: string;
}

// Example proforma data (you can replace this with actual fetched data)
const exampleProformas: Proforma[] = [
  {
    jobTitle: "Software Engineer",
    description:
      "We are looking for a talented Software Engineer with expertise in React.js.",
    skillsRequired: ["React.js", "Node.js", "JavaScript", "CSS", "HTML"],
    experience: "3+ years of experience in full-stack development",
    education: "Bachelor's degree in Computer Science or equivalent",
    location: "Remote",
  },
  {
    jobTitle: "Product Manager",
    description:
      "Seeking a Product Manager with a passion for technology and product development.",
    skillsRequired: [
      "Product Management",
      "Agile",
      "Communication",
      "Leadership",
    ],
    experience: "5+ years in product management",
    education: "Bachelor's degree in Business or related field",
    location: "On-site, New York",
  },
  // Add more proformas as needed
];

export default function ProformaListDisplay() {
  const [proformas, setProformas] = useState<Proforma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetching the proforma data (you can replace this with an API call)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProformas(exampleProformas);
      } catch (error) {
        setError(error + "Failed to load proforma data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleApply(jobTitle: string) {
    toast.success(`Application for ${jobTitle} link clicked!`);
    // Redirect to the application form page here, if needed
  }

  /*if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>*/

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste proformat"
        description="Create a new job posting based on profile requirements"
      />
      <div className="space-y-8">
        {proformas.map((proforma, index) => (
          <Card key={index} className="p-6">
            <h2 className="text-2xl font-semibold">{proforma.jobTitle}</h2>
            <p className="mt-2 text-lg">{proforma.description}</p>

            <div className="mt-4">
              <h3 className="font-medium">Skills Required:</h3>
              <ul className="list-disc pl-5">
                {proforma.skillsRequired.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p>
                <strong>Experience:</strong> {proforma.experience}
              </p>
              <p>
                <strong>Education:</strong> {proforma.education}
              </p>
              <p>
                <strong>Location:</strong> {proforma.location}
              </p>
            </div>

            <Button
              onClick={() => handleApply(proforma.jobTitle)}
              className="mt-4"
            >
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
