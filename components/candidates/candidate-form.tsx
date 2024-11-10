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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import { Poste } from "@/types";

// Define schema with the new date field
const candidateSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  poste_id: z.number().positive("Veuillez sélectionner un poste"),
  date_candidature: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La date est invalide",
  }),
});

export function CandidateForm() {
  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      poste_id: 0,
      date_candidature: new Date(), // Default to today's date
    },
  });

  const [postes, setPostes] = useState<Poste[]>([]);

  // Fetch postes on component mount
  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await axios.get("/api/postes"); // Replace with your API endpoint
        setPostes(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des postes");
      }
    };
    fetchPostes();
  }, []);

  // Submit form data to the API
  async function onSubmit(values: z.infer<typeof candidateSchema>) {
    try {
      await axios.post("/api/candidates", values); // Replace with your API endpoint
      toast.success("Candidature enregistrée avec succès!");
      form.reset();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la candidature");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom Field */}
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

        {/* Prénom Field */}
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

        {/* Email Field */}
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

        {/* Téléphone Field */}
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

        {/* Select Poste */}
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
                  onChange={(e) => field.onChange(Number(e.target.value))} // Ensure it's treated as a number
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

        {/* Date de Candidature Field */}
        <FormField
          control={form.control}
          name="date_candidature"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Soumettre la candidature
        </Button>
      </form>
    </Form>
  );
}
