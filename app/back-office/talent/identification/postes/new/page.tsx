"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api_url, Competence } from "@/types";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const positionSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  departement: z.string().min(1, { message: "Le département est requis" }),
  competences_id: z
    .array(z.number())
    .min(1, { message: "Sélectionnez au moins une compétence" }),
});

type PositionFormData = z.infer<typeof positionSchema>;

const CreatePosition = () => {
  const [competences, setCompetences] = useState<Competence[]>([]);
  const { toast } = useToast();

  const form = useForm<PositionFormData>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      titre: "",
      description: "",
      departement: "",
      competences_id: [],
    },
  });

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const response = await axios.get(`${api_url}competence`);
        setCompetences(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des compétences", err);
      }
    };

    fetchCompetences();
  }, []);

  const handleCompetenceChange = (id: number) => {
    const { competences_id } = form.getValues();
    const isSelected = competences_id.includes(id);
    const updatedCompetences = isSelected
      ? competences_id.filter((compId) => compId !== id)
      : [...competences_id, id];

    form.setValue("competences_id", updatedCompetences);
  };

  async function onSubmit(values: PositionFormData) {
    try {
      console.log("Données envoyées :", JSON.stringify(values, null, 2));
      await axios.post(api_url + "poste", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        title: "Succès.",
        description: "Poste enregistrée avec succès!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! une erreur.",
        description: error.response?.data || "Erreur lors de l'enregistrement.",
      });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Création de poste"
        description="Créer un nouveau poste"
      />
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau poste</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {/* titre */}
                  <FormField
                    control={form.control}
                    name="titre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input placeholder="titre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* departement */}
                  <FormField
                    control={form.control}
                    name="departement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Département</FormLabel>
                        <FormControl>
                          <Input placeholder="département" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Compétences */}
                  <div>
                    <FormLabel>Compétences</FormLabel>
                    {competences.map((competence) => (
                      <FormField
                        key={competence.id}
                        control={form.control}
                        name="competences_id"
                        render={() => (
                          <FormItem className="flex items-center mt-2">
                            <FormControl>
                              <input
                                title="competence"
                                type="checkbox"
                                id={`competence-${competence.id}`}
                                checked={form
                                  .watch("competences_id")
                                  .includes(competence.id)}
                                onChange={() =>
                                  handleCompetenceChange(competence.id)
                                }
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`competence-${competence.id}`}
                              className="ml-2"
                            >
                              {competence.nom}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button type="submit" className="w-full md:w-auto">
                  Soumettre la poste
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePosition;
