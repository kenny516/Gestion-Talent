"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api_url, Competence } from "@/types";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { useToast } from "@/hooks/use-toast";

const positionSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  departement: z.string().min(1, { message: "Le département est requis" }),
  competences_id: z
    .array(z.number())
    .min(1, { message: "Sélectionnez au moins une compétence" }),
});

type PositionFormData = z.infer<typeof positionSchema>;

const CreatePosition = () => {
  const [formData, setFormData] = useState<PositionFormData>({
    titre: "",
    description: "",
    departement: "",
    competences_id: [],
  });
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const response = await axios.get(`${api_url}competence`);
        setCompetences(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des compétences", err);
      }
    };

    fetchCompetences();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({});
  };

  const handleCompetenceChange = (id: number) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.competences_id.includes(id);
      const updatedCompetences = isSelected
        ? prevFormData.competences_id.filter((compId) => compId !== id)
        : [...prevFormData.competences_id, id];

      return { ...prevFormData, competences_id: updatedCompetences };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = positionSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      console.log(formData);
      await axios.post(api_url + "poste", formData);

      toast({
        variant:"default",
        title: "Poste enregistrer avec succes",
        description: "avec ses competences",
      });
      setFormData({
        titre: "",
        description: "",
        departement: "",
        competences_id: [],
      });
    } catch (error:any) {
        toast({
            variant:"destructive",
            title: "Uh oh! une erreur.",
            description: error.response.data,
          });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creation de poste"
        description="Cree un nouveau poste"
      />
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau poste</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="titre"
                className="block text-sm font-medium text-gray-700"
              >
                Titre
              </label>
              <Input
                id="titre"
                name="titre"
                placeholder="Titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
              {validationErrors.titre && (
                <p className="text-red-500">{validationErrors.titre}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              {validationErrors.description && (
                <p className="text-red-500">{validationErrors.description}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="departement"
                className="block text-sm font-medium text-gray-700"
              >
                Département
              </label>
              <Input
                id="departement"
                name="departement"
                placeholder="Département"
                value={formData.departement}
                onChange={handleChange}
                required
              />
              {validationErrors.departement && (
                <p className="text-red-500">{validationErrors.departement}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Compétences
              </label>
              <div className="space-y-2">
                {competences.map((competence) => (
                  <div key={competence.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`competence-${competence.id}`}
                      checked={formData.competences_id.includes(competence.id)}
                      onChange={() => handleCompetenceChange(competence.id)}
                    />
                    <label
                      htmlFor={`competence-${competence.id}`}
                      className="ml-2"
                    >
                      {competence.nom}
                    </label>
                  </div>
                ))}
                {validationErrors.competences_id && (
                  <p className="text-red-500">
                    {validationErrors.competences_id}
                  </p>
                )}
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Créer le poste"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePosition;
