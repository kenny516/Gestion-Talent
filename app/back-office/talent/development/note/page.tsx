"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming an Input component in your UI library
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming Select component
import axios from "axios";
import { api_url, Candidat, TypeNote, NoteCandidat } from "@/types";
import { PageHeader } from "@/components/page-header";

export default function CandidateNoteForm() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);
  const [typeNotes, setTypeNotes] = useState<TypeNote[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );
  const [selectedTypeNoteId, setSelectedTypeNoteId] = useState<number | null>(
    null
  );
  const [note, setNote] = useState<number | undefined>();

  // Fetch candidates and type notes
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(api_url + "candidat");
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    const fetchTypeNotes = async () => {
      try {
        const response = await axios.get(api_url + "typenotes");
        setTypeNotes(response.data);
      } catch (error) {
        console.error("Error fetching type notes:", error);
      }
    };

    fetchCandidates();
    fetchTypeNotes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCandidateId && selectedTypeNoteId && note !== undefined) {
      const noteCandidat: NoteCandidat = {
        idCandidat: selectedCandidateId,
        idTypeNote: selectedTypeNoteId,
        note,
      };

      try {
        await axios.post(api_url + "noteCandidat", noteCandidat);
        alert("Note ajoutée avec succès");
      } catch (error) {
        console.error("Error submitting note:", error);
        alert("Erreur lors de l'ajout de la note");
      }
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ajouter une note pour un candidat"
        description="Choisissez un candidat et un type de note, puis entrez la note."
      />
      <Card className="p-6 flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle>Formulaire d’insertion des notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Candidate Selection */}
            <Select
              onValueChange={(value) => setSelectedCandidateId(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un candidat" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map((candidate) => (
                  <SelectItem key={candidate.id} value={String(candidate.id)}>
                    {candidate.nom} {candidate.prenom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type of Note Selection */}
            <Select
              onValueChange={(value) => setSelectedTypeNoteId(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type de note" />
              </SelectTrigger>
              <SelectContent>
                {typeNotes.map((typeNote) => (
                  <SelectItem key={typeNote.id} value={String(typeNote.id)}>
                    {typeNote.nomType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Note Input */}
            <Input
              type="number"
              placeholder="Entrer la note"
              value={note}
              onChange={(e) => setNote(Number(e.target.value))}
              min={0}
              max={20}
            />

            {/* Submit Button */}
            <Button type="submit" variant="default">
              Ajouter la note
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
