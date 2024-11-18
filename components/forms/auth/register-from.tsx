"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { api_url, Diplome } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const experienceSchema = z.object({
  dateDebut: z.string().min(1, "La date de début est requise"),
  dateFin: z.string().optional(),
  description: z.string().min(1, "La description est requise"),
});

const formationSchema = z.object({
  dateDebut: z.string().min(1, "La date de début est requise"),
  dateFin: z.string().optional(),
  description: z.string().min(1, "La description est requise"),
});

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  motDePasse: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  experiences: z.array(experienceSchema),
  formations: z.array(formationSchema),
  diplomes: z.array(z.number().positive("selectionner un diplome")),
});

export default function RegisterForm() {
  const [diplome, setDiplome] = useState<Diplome[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      motDePasse: "",
      experiences: [],
      formations: [],
      diplomes: [],
    },
  });

  useEffect(() => {
    const fetchDiplome = async () => {
      try {
        const response = await axios.get(api_url + "diplomes");

        setDiplome(response.data as Diplome[]);
      } catch (error) {
        console.error("Erreur lors de la récupération des diplômes:", error);
      }
    };
    fetchDiplome();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(api_url + "candidat", values);
      window.location.href = "/auth/login";
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la création du candidat:", error);
    }
  };

  const addExperience = () => {
    const experiences = form.getValues("experiences");
    form.setValue("experiences", [
      ...experiences,
      { dateDebut: "", dateFin: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    const experiences = form.getValues("experiences");
    form.setValue(
      "experiences",
      experiences.filter((_, i) => i !== index)
    );
  };

  const addFormation = () => {
    const formations = form.getValues("formations");
    form.setValue("formations", [
      ...formations,
      { dateDebut: "", dateFin: "", description: "" },
    ]);
  };

  const removeFormation = (index: number) => {
    const formations = form.getValues("formations");
    form.setValue(
      "formations",
      formations.filter((_, i) => i !== index)
    );
  };

  const addDiplome = () => {
    const diplomes = form.getValues("diplomes");
    form.setValue("diplomes", [...diplomes, 0]);
  };

  const removeDiplome = (index: number) => {
    const diplomes = form.getValues("diplomes");
    form.setValue(
      "diplomes",
      diplomes.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Inscription Candidat</CardTitle>
        <CardDescription>
          Créez votre profil pour postuler à nos offres d&apos;emploi.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personnel</TabsTrigger>
                <TabsTrigger value="experiences">Expériences</TabsTrigger>
                <TabsTrigger value="formations">Formations</TabsTrigger>
                <TabsTrigger value="diplomes">Diplômes</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
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
                          placeholder="jean.dupont@example.com"
                          {...field}
                        />
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
                        <Input placeholder="+33 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motDePasse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="experiences">
                <ScrollArea className="h-[400px] pr-4">
                  {form.watch("experiences").map((_, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded-md relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.dateDebut`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de début</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.dateFin`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de fin</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </ScrollArea>
                <Button type="button" onClick={addExperience} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Ajouter une expérience
                </Button>
              </TabsContent>
              <TabsContent value="formations">
                <ScrollArea className="h-[400px] pr-4">
                  {form.watch("formations").map((_, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded-md relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFormation(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <FormField
                        control={form.control}
                        name={`formations.${index}.dateDebut`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de début</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`formations.${index}.dateFin`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de fin</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`formations.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </ScrollArea>
                <Button type="button" onClick={addFormation} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Ajouter une formation
                </Button>
              </TabsContent>
              <TabsContent value="diplomes">
                <ScrollArea className="h-[400px] pr-4">
                  {form.watch("diplomes").map((_, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded-md relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeDiplome(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <FormField
                        control={form.control}
                        name={`diplomes.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diplôme</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un diplôme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {diplome.map((option) => (
                                  <SelectItem
                                    key={option.id + index}
                                    value={String(option.id)}
                                  >
                                    {option.diplome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </ScrollArea>
                <Button type="button" onClick={addDiplome} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Ajouter un diplôme
                </Button>
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
