"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const applications = [
  {
    id: 1,
    job: "Développeur Full Stack",
    company: "Tech Solutions",
    status: "En cours",
    progress: 60,
    steps: ["CV envoyé", "Entretien RH", "Test technique", "Entretien final"],
    currentStep: 2,
  },
  {
    id: 2,
    job: "Chef de Projet IT",
    company: "Digital Agency",
    status: "En attente",
    progress: 25,
    steps: ["CV envoyé", "Entretien RH", "Test technique", "Entretien final"],
    currentStep: 1,
  },
];

export function ApplicationStatus() {
  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <Card key={application.id} className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{application.job}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {application.company}
            </p>
          </div>

          <div className="mb-4">
            <Badge
              variant={
                application.status === "En cours" ? "default" : "secondary"
              }
            >
              {application.status}
            </Badge>
          </div>

          <Progress value={application.progress} className="mb-4" />

          <div className="grid grid-cols-4 gap-2">
            {application.steps.map((step, index) => (
              <div
                key={step}
                className={`text-center text-sm ${
                  index <= application.currentStep
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
