"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookUser, CircleX, LoaderCircle } from "lucide-react";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
          Créer un compte
        </CardTitle>
        <CardDescription className="text-center text-base">
          Commencez votre parcours professionnel
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom" className="text-sm font-medium">
                  Nom
                </Label>
                <Input
                  id="nom"
                  type="text"
                  required
                  className="h-11"
                  placeholder="Dupont"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom" className="text-sm font-medium">
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  type="text"
                  required
                  className="h-11"
                  placeholder="Jean"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="h-11"
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="h-11"
                placeholder="••••••••"
              />
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
            Créer un compte
          </Button>
          <p className="text-sm text-muted-foreground text-center px-4">
            Déjà inscrit?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </form>
    </>
  );
}
