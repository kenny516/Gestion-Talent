"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookUser, CircleX, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api_url } from "@/types";
import { useToast } from "@/hooks/use-toast";


// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError("");
    toast({
        variant: "default",
        title: "Connexion réussie",
      });
    try {
      const response = await axios.post(api_url + "candidat/login", data);
      const { id } = response.data; // Get the returned ID from the API

      // Store the ID in session storage
      sessionStorage.setItem("candidat_id", id);

      toast({
        variant: "default",
        title: "Connexion réussie",
      });
      window.location.href = "/front-office/";
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CardHeader className="space-y-3 pb-8">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-primary/10 p-3 rounded-2xl">
              <BookUser className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Bienvenue
        </CardTitle>
        <CardDescription className="text-center text-base">
          Connectez-vous à votre espace candidat
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 bg-red-50 p-3 rounded-lg flex items-center gap-2"
              >
                <CircleX className="h-4 w-4" />
                {error}
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-6 pt-4">
            <Button
              className="w-full h-11 text-base font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Se connecter
            </Button>
            <p className="text-sm text-muted-foreground text-center px-4">
              Nouveau candidat?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-medium hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
