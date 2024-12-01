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
import { z } from "zod";
import { api_url } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function AvanceForm() {
  const [employes, setEmployes] = useState([
    { id: 1, nom: "Rakoto", prenom: "Jean" },
  ]);
  const [minMaxPercent, setminMaxPercent] = useState({ min: 0, max: 100 });
  const [minMaxMontant, setminMaxMontant] = useState({ min: 0, max: 100 });
  const { toast } = useToast();

  // Fetch min and max dynamically
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get(`${api_url}avance/employe`);
        setEmployes(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchminMaxPercent = async () => {
      try {
        const response = await axios.get(
          `${api_url}avance/intervalle-pourcentage`
        );
        setminMaxPercent(response.data); // Assuming the response has { min: X, max: Y }
      } catch (error) {
        console.error("Error fetching min-max values:", error);
      }
    };

    const fetchminMaxMontant = async () => {
      try {
        const response = await axios.get(`${api_url}avance/intervalle-montant`);
        setminMaxMontant(response.data); // Assuming the response has { min: X, max: Y }
      } catch (error) {
        console.error("Error fetching min-max values:", error);
      }
    };

    // fetchEmployes();
    fetchminMaxPercent();
    fetchminMaxMontant();
  }, []);

  const avanceFormSchema = z.object({
    idEmploye: z
      .number()
      .min(1, { message: "Veuillez sélectionner un employé" }),
    montant: z
      .number()
      .refine(
        (value) => value >= minMaxMontant.min && value <= minMaxMontant.max,
        {
          message: `Le montant doit être entre ${minMaxMontant.min} et ${minMaxMontant.max}`,
        }
      ),
    pourcentageDebitable: z
      .number()
      .refine(
        (value) => value >= minMaxPercent.min && value <= minMaxPercent.max,
        {
          message: `Le pourcentage doit être entre ${minMaxPercent.min} et ${minMaxPercent.max}`,
        }
      ),
    dateAvance: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Date invalide",
    }),
    raison: z.string().optional(),
  });

  type AvanceFormValues = z.infer<typeof avanceFormSchema>;

  const form = useForm<AvanceFormValues>({
    resolver: zodResolver(avanceFormSchema),
    defaultValues: {
      idEmploye: 0,
      montant: 0,
      pourcentageDebitable: 0,
      dateAvance: "",
      raison: "",
    },
  });

  const onSubmit = async (data: AvanceFormValues) => {
    const avance = {
      idEmploye: data.idEmploye,
      montant: data.montant,
      pourcentageDebitable: data.pourcentageDebitable,
      dateAvance: data.dateAvance,
      raison: data.raison || null,
    };

    // console.log(avance);

    try {
      const response = await axios.post(`${api_url}avance/save`, avance);

      if (response.data.success) {
        toast({
          variant: "default",
          title: "Succès",
          description: "Avance créée avec succès.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.data.errorMessage,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.response?.data || "Erreur lors de la création.",
      });
    }
  };

  return (
    <div className="space-y-8 py-5 px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Formulaire d'Avance</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="idEmploye"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("idEmploye", Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                        <SelectContent>
                          {employes.map((employe: any) => (
                            <SelectItem
                              key={employe.id}
                              value={employe.id.toString()}
                            >
                              {employe.nom} {employe.prenom}
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
                name="montant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={`Entre ${minMaxMontant.min} et ${minMaxMontant.max}`}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        min={minMaxMontant.min}
                        max={minMaxMontant.max}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pourcentageDebitable"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Pourcentage du salaire (pour le remboursement)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={`Entre ${minMaxPercent.min} et ${minMaxPercent.max}`}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        min={minMaxPercent.min}
                        max={minMaxPercent.max}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateAvance"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Date de l'avance</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="raison"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raison</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Entrez la raison (optionnel)"
                        value={field.value || ""}
                        onChange={field.onChange}
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
