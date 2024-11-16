"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Jan", applications: 65, interviews: 45 },
  { name: "Fév", applications: 80, interviews: 55 },
  { name: "Mar", applications: 95, interviews: 65 },
  { name: "Avr", applications: 75, interviews: 50 },
  { name: "Mai", applications: 85, interviews: 60 },
  { name: "Juin", applications: 120, interviews: 80 },
]

const CustomXAxis = (props: any) => (
  <XAxis
    {...props}
    scale="auto"
    padding={{ left: 0, right: 0 }}
  />
)

const CustomYAxis = (props: any) => (
  <YAxis
    {...props}
    scale="auto"
    padding={{ top: 20, bottom: 0 }}
  />
)

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium">Total Candidatures</h3>
          <p className="text-2xl font-bold">520</p>
          <p className="text-sm text-muted-foreground">+12% vs mois dernier</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Taux de Conversion</h3>
          <p className="text-2xl font-bold">15.4%</p>
          <p className="text-sm text-muted-foreground">+2.3% vs mois dernier</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Temps Moyen de Recrutement</h3>
          <p className="text-2xl font-bold">28 jours</p>
          <p className="text-sm text-muted-foreground">-3 jours vs mois dernier</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Évolution des candidatures</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#2563eb"
                strokeWidth={2}
                name="Candidatures"
              />
              <Line
                type="monotone"
                dataKey="interviews"
                stroke="#16a34a"
                strokeWidth={2}
                name="Entretiens"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">Sources de Recrutement</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>LinkedIn</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span>Site Web</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex justify-between">
              <span>Références</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span>Autres</span>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">Statuts des Candidatures</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>En cours d'évaluation</span>
              <span className="font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span>Entretien planifié</span>
              <span className="font-medium">28</span>
            </div>
            <div className="flex justify-between">
              <span>Test technique</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between">
              <span>Offre envoyée</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}