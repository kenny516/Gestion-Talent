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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url, Employe, TypeConge, Conge } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
// Validation schema using Zod
const congéSchema = z.object({
  employe_id: z.number().positive("Veuillez sélectionner un employé"),
  type_conge_id: z.number().positive("Veuillez sélectionner un type de congé"),
  date_debut: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La date de début est invalide",
  }),
  date_fin: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La date de fin est invalide",
  }),
  motif: z.string().min(5, "Le motif doit contenir au moins 5 caractères"),
});

export default function CongéForm() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [typesConge, setTypesConge] = useState<TypeConge[]>([]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof congéSchema>>({
    resolver: zodResolver(congéSchema),
    defaultValues: {
      employe_id: 0,
      date_debut: new Date(),
      date_fin: new Date(),
      motif: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get(api_url + "employe");
        setEmployes(response.data);
      } catch (error) {
        console.error(error + "Erreur lors du chargement des employés");
      }
    };
    const fetchTypesConge = async () => {
      try {
        const response = await axios.get(api_url + "type-conge");
        setTypesConge(response.data);
      } catch (error) {
        console.error(error + "Erreur lors du chargement des types de congé");
      }
    };
    fetchEmployes();
    fetchTypesConge();
  }, []);

  async function onSubmit(values: z.infer<typeof congéSchema>) {
    try {
      const newConge: Conge = {
        employe: {
          id: values.employe_id,
          nom: "",
          prenom: "",
          email: "",
          poste: { id: 0, titre: "", description: "", departement: "" },
        },
        idTypeConge:{
            id: values.type_conge_id,
            nom: "",
            estPaye: false,
            cumulable: false,
            dureeMax: 0,
        },
        dateDebut: format(values.date_debut, "yyyy-MM-dd"),
        dateFin: format(values.date_fin, "yyyy-MM-dd"),
        duree: Math.floor(
          (new Date(values.date_fin).getTime() -
            new Date(values.date_debut).getTime()) /
            (1000 * 3600 * 24)
        ),
        status: "En attente",
      };
      const response = await axios.post(api_url + "conge", newConge, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        title: "Succès.",
        description: "Congé enregistré avec succès!",
      });
      form.reset();
      router.push(`/back-office/rh/conge`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur.",
        description: error.response.data,
      });
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Employee Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Left Column */}
              <FormField
                control={form.control}
                name="employe_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border p-2 rounded-md"
                        onChange={(e) => {field.onChange(Number(e.target.value))}}
                      >
                        <option value={0}>Sélectionner un employé</option>
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
            </div>
          </div>

          {/* Type de Congé Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="type_conge_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de Congé</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border p-2 rounded-md"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value={0}>Sélectionner un type de congé</option>
                        {typesConge.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.nom}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Date Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="date_debut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
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
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
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

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="date_fin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
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
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
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

          {/* Motif Section */}
          <FormField
            control={form.control}
            name="motif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez le motif" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Soumettre
          </Button>
        </form>
      </Form>
    </Card>
  );
}
