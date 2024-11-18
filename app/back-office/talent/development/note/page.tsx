"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { api_url, Candidat, TypeNote, NoteCandidatForm } from "@/types";
import { PageHeader } from "@/components/page-header";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
// component formulaire pour insertion de note pour un candidat choisi (Avec l usage des type dasn index.ts)

// Define the Zod schema
const noteFormSchema = z.object({
  candidateId: z
    .number()
    .min(1, { message: "Veuillez sélectionner un candidat" }),
  typeNoteId: z
    .number()
    .min(1, { message: "Veuillez sélectionner un type de note" }),
  note: z
    .number()
    .min(0, { message: "La note doit être au minimum 0" })
    .max(10, { message: "La note doit être au maximum 10" }),
});

// Form values type inferred from Zod schema
type NoteFormValues = z.infer<typeof noteFormSchema>;

export default function CandidateNoteForm() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);
  const [typeNotes, setTypeNotes] = useState<TypeNote[]>([]);
  const { toast } = useToast();

  // Setup useForm with Zod schema validation
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      candidateId: 0,
      typeNoteId: 0,
      note: 0,
    },
  });

  // Fetch candidates and type notes
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${api_url}candidat/non_refus`);
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    const fetchTypeNotes = async () => {
      try {
        const response = await axios.get(`${api_url}type_note`);
        setTypeNotes(response.data);
      } catch (error) {
        console.error("Error fetching type notes:", error);
      }
    };

    fetchCandidates();
    fetchTypeNotes();
  }, []);

  // Form submission handler
  const onSubmit = async (data: NoteFormValues) => {
    const noteCandidat: NoteCandidatForm = {
      idCandidat: data.candidateId,
      idTypeNote: data.typeNoteId,
      note: data.note,
    };

    try {
      console.log(JSON.stringify(noteCandidat));
      await axios.post(`${api_url}candidat/note`, noteCandidat);
      toast({
        variant: "default",
        title: "success",
        description: "Note ajoutée avec succès",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! error ",
        description: error.response.data,
      });
    }
  };

  return (
    <div className="space-y-8 px-4 md:px-8">
      <PageHeader
        title="Ajouter une note"
        description="Sélectionnez le candidat, le type de note, et entrez la note."
      />
      <Card>
        <CardHeader>
          <CardTitle>Formulaire de note</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="candidateId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Candidat</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("candidateId", Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un candidat" />
                        </SelectTrigger>
                        <SelectContent>
                          {candidates.map((candidate) => (
                            <SelectItem
                              key={candidate.id}
                              value={candidate.id.toString()}
                            >
                              {candidate.nom} {candidate.prenom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeNoteId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Type de note</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("typeNoteId", Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type de note" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeNotes.map((typeNote) => (
                            <SelectItem
                              key={typeNote.id}
                              value={typeNote.id.toString()}
                            >
                              {typeNote.nomType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Entrez la note"
                        value={
                          field.value !== undefined && !isNaN(field.value)
                            ? field.value
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Soumettre</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
