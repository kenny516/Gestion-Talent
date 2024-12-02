"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { PageHeader } from "@/components/page-header";
import { useToast } from "@/hooks/use-toast";

const payeSchema = z.object({
  EmployeId: z
    .number()
    .positive("L'identifiant de l'employé doit être un entier positif."),
  datePaiement: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), "La date est invalide"),
});

export default function PayeForm({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [employeId, setEmployeId] = useState<number | string>(0);
  const { toast } = useToast();

  useEffect(() => {
    const getEmpId = async () => {
      const employe = await params;
      setEmployeId(employe.id);
    };
    getEmpId();
  }, []);

  const form = useForm<z.infer<typeof payeSchema>>({
    resolver: zodResolver(payeSchema),
    defaultValues: {
      EmployeId: Number(employeId), // Assurez-vous que c'est un nombre
      datePaiement: "",
    },
  });

  useEffect(() => {
    form.setValue("EmployeId", Number(employeId)); // Conversion en nombre explicite
  }, [employeId, form]);

  const onSubmit = async (values: z.infer<typeof payeSchema>) => {
    console.log("Données soumises :", values);
    try {
      // Simulez un appel API
      toast({
        variant: "default",
        title: "Succès",
        description: "Paiement enregistré avec succès!",
      });
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des employés"
        description="Liste des employés avec leurs compétences et informations de poste"
      />
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Champ EmployeId caché */}
            <FormField
              control={form.control}
              name="EmployeId"
              render={({ field }) => (
                <FormItem>
                  <input
                    type="hidden"
                    {...field}
                    value={field.value || ""} // Assurez-vous que la valeur est correctement initialisée
                  />
                </FormItem>
              )}
            />

            {/* Champ datePaiement */}
            <FormField
              control={form.control}
              name="datePaiement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de Paiement</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date?.toISOString().split("T")[0]);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bouton de soumission */}
            <div className="flex justify-end mt-6">
              <Button type="submit" className="w-full md:w-auto">
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
