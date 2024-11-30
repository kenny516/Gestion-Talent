import React, { useState } from 'react';
import FormulaireHeureSup from '@/components/FormulaireHeureSup';
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const PageHeuresSup = () => {
  const [heuresSup, setHeuresSup] = useState([
    { 
      date: "2024-11-01", 
      heures: 5, 
      status: "validée" 
    },
    { 
      date: "2024-11-02", 
      heures: 7, 
      status: "en attente" 
    },
    { 
      date: "2024-11-03", 
      heures: 3, 
      status: "rejetée" 
    },
  ]);

  const handleFormSubmit = (data: { date: string; heures: number }) => {
    // Ajouter les nouvelles heures supplémentaires au tableau existant
    setHeuresSup((prevHeuresSup) => [
      ...prevHeuresSup,
      { date: data.date, heures: data.heures, status: "en attente" }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Formulaire pour ajouter des heures supplémentaires */}
      <Card className="p-6 shadow-md bg-white rounded-lg">
        <h2 className="text-xl font-bold mb-4">Créer une Heure Supplémentaire</h2>
        <FormulaireHeureSup onSubmit={handleFormSubmit} />
      </Card>

      {/* Card pour afficher la liste des heures supplémentaires */}
      <Card className="p-6 shadow-md bg-white rounded-lg">
        <h2 className="text-xl font-bold mb-4">Heures Supplémentaires à Venir</h2>

        {/* Table des heures supplémentaires */}
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Heures</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heuresSup.map((heure, index) => (
              <TableRow key={index}>
                <TableCell>{heure.date}</TableCell>
                <TableCell>{heure.heures}</TableCell>
                <TableCell>
                  <Badge
                    color={heure.status === "validée" ? "green" : heure.status === "rejetée" ? "red" : "yellow"}
                  >
                    {heure.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={heure.status === "validée" ? "secondary" : "default"}
                  >
                    {heure.status === "validée" ? <CheckCircle /> : <XCircle />}
                    {heure.status === "validée" ? "Approuvée" : "Annuler"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PageHeuresSup;
