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
  id_employe: z.number({ required_error: "L'identifiant de l'employé est requis" }),
  date_debut: z.string().min(1, { message: "La date de début est requise" }),
  date_fin: z.string().min(1, { message: "La date de fin est requise" }),
  total_heures_sup: z.number().nonnegative().optional(),
  montant: z.number().positive({ message: "Le montant est requis" }),
});

type HeuresSupFormData = z.infer<typeof heuresSupSchema>;

const CreateHeuresSup = () => {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const { toast } = useToast();

  const form = useForm<HeuresSupFormData>({
    resolver: zodResolver(heuresSupSchema),
    defaultValues: {
      id_employe: 0,
      date_debut: "",
      date_fin: "",
      total_heures_sup: undefined,
      montant: 0,
    },
  });

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get(`${api_url}employes`);
        setEmployes(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des employés", err);
      }
    };

    fetchEmployes();
  }, []);

  async function onSubmit(values: HeuresSupFormData) {
    try {
      console.log("Données envoyées :", JSON.stringify(values, null, 2));
      await axios.post(api_url + "heures_sup", values, {
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
                name="id_employe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">Sélectionnez un employé</option>
                        {employes.map((employe) => (
                          <option key={employe.id} value={employe.id}>
                            {employe.nom}
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
                name="date_debut"
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
                name="date_fin"
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

              {/* Montant */}
              <FormField
                control={form.control}
                name="montant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Montant en Ariary" {...field} />
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
