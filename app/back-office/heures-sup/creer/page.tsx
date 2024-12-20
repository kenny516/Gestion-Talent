"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api_url, Employe } from "@/types";
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
import Link from "next/link";

const heuresSupSchema = z.object({
  employe: z
    .object({
      id: z.number()
    })
    .nullable(),
  dateDebut: z.string().min(1, { message: "La date de début est requise" }),
  dateFin: z.string().min(1, { message: "La date de fin est requise" }),
});

type HeuresSupFormData = z.infer<typeof heuresSupSchema>;

const CreateHeuresSup = () => {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const { toast } = useToast();

  const form = useForm<HeuresSupFormData>({
    resolver: zodResolver(heuresSupSchema),
    defaultValues: {
      employe: null,
      dateDebut: "",
      dateFin: "",
    },
  });

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get(`${api_url}employe`);
        setEmployes(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployes();
  }, []);

  async function onSubmit(values: HeuresSupFormData) {
    try {
      console.log("Données à envoyer :", values);
      await axios.post(api_url + "heures-sup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        title: "Succès.",
        description: "Heures supplémentaires enregistrées avec succès!",
      });
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  }

  return (
    <div className="space-y-10 p-10">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Création d'heures supplémentaires"
          description="Enregistrer les heures supplémentaires d'un employé"
        />
        <Link href={`/back-office/heures-sup/`}>
          <Button variant="outline" size="sm">
            ← Retour à la liste
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Créer des heures supplémentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Employé */}
              <FormField
                control={form.control}
                name="employe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value?.id || ""}
                        onChange={(e) => {
                          const selectedId = Number(e.target.value);
                          const selectedEmploye = employes.find(
                            (employe) => employe.id === selectedId
                          );
                          field.onChange(selectedEmploye || null);
                        }}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">Sélectionnez un employé</option>
                        {employes.map((employe) => (
                          <option key={employe.id} value={employe.id}>
                            {employe.nom} {employe.prenom}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <FormField
                control={form.control}
                name="dateDebut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateFin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <div className="flex justify-end mt-6">
                <Button type="submit" className="w-full md:w-auto">
                  Soumettre
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHeuresSup;
