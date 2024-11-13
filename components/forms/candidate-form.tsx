"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url, Competence, Poste } from "@/types";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { useToast } from "@/hooks/use-toast";

const candidateSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  poste_id: z.number().positive("Veuillez sélectionner un poste"),
  candidaturTime: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La date est invalide",
  }),
  competences: z.array(
    z.object({
      id: z.number(),
      niveau: z.number().min(0).max(10),
    })
  ),
});

export function CandidateForm() {
  const [postes, setPostes] = useState<Poste[]>([]);
  const [competences, setCompetences] = useState<Competence[]>([]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      poste_id: 0,
      candidaturTime: new Date(),
      competences: [],
    },
  });

  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await axios.get(api_url + "poste");
        setPostes(response.data);
      } catch (error) {
        console.error(error + "Erreur lors du chargement des postes");
      }
    };
    fetchPostes();
  }, []);

  const fetchCompetences = async (idPoste: number) => {
    try {
      const response = await axios.get(api_url + "competence/poste/" + idPoste);
      const competencesWithNiveau = response.data.map((comp: Competence) => ({
        ...comp,
        niveau: 0,
      }));
      form.setValue("competences", competencesWithNiveau);
      setCompetences(competencesWithNiveau);
    } catch (error) {
      console.error(error + "Erreur lors du chargement des competences");
    }
  };

  useEffect(() => {
    const selectedPosteId = form.watch("poste_id");
    if (selectedPosteId) fetchCompetences(selectedPosteId);
  }, [form.watch("poste_id")]);

  async function onSubmit(values: z.infer<typeof candidateSchema>) {
    try {
      console.log("Données envoyées :", JSON.stringify(values, null, 2));
      await axios.post(api_url + "candidat", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        title: "Succes.",
        description: "Candidature enregistrée avec succès!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! une erreur.",
        description: error.response.data,
      });
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Left Column */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="poste_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poste</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border p-2 rounded-md"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value={0}>Sélectionner un poste</option>
                        {postes.map((poste) => (
                          <option key={poste.id} value={poste.id}>
                            {poste.titre}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {/* Right Column */}
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+261 34 00 000 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="candidaturTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de candidature</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Competences Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Compétences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competences.map((competence, index) => (
                <FormField
                  key={competence.id}
                  control={form.control}
                  name={`competences.${index}.niveau`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{competence.nom} (0-5)</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={5}
                          step={0.5}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <Button type="submit" className="w-full md:w-auto">
              Soumettre la candidature
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
