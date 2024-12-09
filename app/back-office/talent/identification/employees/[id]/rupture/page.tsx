"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "@/types";

interface FormData {
  typeRupture: { id: number };
  employe: { id: number };
  dateNotification: string;
  preavisEmploye: boolean;
  preavisEntreprise: boolean;
  motif?: string;
  indemniteVerse?: string;
}

const RuptureForm = ({ params }: { params: Promise<{ id: number }> }) => {
  const { toast } = useToast();
  const [id, setId] = useState<number | null>(null);
  const [typeRuptures, setTypeRuptures] = useState<Array<{
    id: number;
    nom: string;
  }> | null>(null);

	const [dateValue, setDateValue] = useState(
		new Date().toISOString().split("T")[0]
	);
	
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Await the params Promise
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const getRuptutres = async () => {
      try {
        setTypeRuptures(
          (await axios.get(`${api_url}employe/type-rupture`)).data
        );
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les types de rupture de contrat",
        });
      }
    };

    getRuptutres();
  }, [id, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      typeRupture: { id: Number(formData.get("id_type_rupture")) },
      employe: { id: (await params).id },
      dateNotification: formData.get("date_notification") as string,
      preavisEmploye: formData.get("preavis_employe") === "on",
      preavisEntreprise: formData.get("preavis_entreprise") === "on",
      motif: formData.get("motif")?.toString(),
      indemniteVerse: formData.get("indemnite_verse")?.toString(),
    };
		console.log(data);
    try {
      await axios.post(`${api_url}employe/rupture`, data);
      toast({
        title: "Succès",
        description: "Données soumises avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi des données.",
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="id_type_rupture">Type de Rupture</Label>
        <Select name="id_type_rupture" required>
          <SelectTrigger>
            <SelectValue placeholder="Choisir le type de rupture" />
          </SelectTrigger>
          <SelectContent>
            {typeRuptures !== null &&
              typeRuptures.map((rupture) => (
                <SelectItem value={`${rupture?.id}`} key={rupture?.id}>
                  {rupture?.nom} {rupture?.id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <Input
        type="date"
        id="date_notification"
        name="date_notification"
        value={dateValue || ""} // Ensure value is always defined
        onChange={(e) => setDateValue(e.target.value)} // Update state
      />

      <div className="flex items-center gap-3">
        <Checkbox
          id="preavis_employe"
          name="preavis_employe"
          value={"checked"}
        />
        <Label htmlFor="preavis_employe">
          Préavis Employé (<small>l&apos;employe respecte le preavis</small>)
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="preavis_entreprise" name="preavis_entreprise" />
        <Label htmlFor="preavis_entreprise">
          Préavis Entreprise (
          <small>l&apos;entreprise respecte le preavis</small>)
        </Label>
      </div>

      <div>
        <Label htmlFor="motif">Motif</Label>
        <Input type="text" id="motif" name="motif" />
      </div>

      <div>
        <Label htmlFor="indemnite_verse">Indemnité Versée</Label>
        <Input type="text" id="indemnite_verse" name="indemnite_verse" />
      </div>

      <Button type="submit" className="w-full">
        Soumettre
      </Button>
    </form>
  );
};

export default RuptureForm;