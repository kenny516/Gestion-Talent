"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { EmployeDetail } from "../page";

interface FormData {
  employe: { id: number };
  poste: { id: number };
  typeContrat: { id: number };
  dateDebut: string;
  salaire: string;
}

const ContratForm = ({ params }: { params: Promise<{ id: number }> }) => {
  const { toast } = useToast();
  const [id, setId] = useState<number | null>(null);
  const [postes, setPostes] = useState<Array<{ id: number; titre: string }> | null>(null);
  const [typeContrats, setTypeContrats] = useState<Array<{ id: number; nom: string }> | null>(null);
  const [employe, setEmploye] = useState<EmployeDetail | null>(null);
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    const fetchEmploye = async () => {
      try {
        const response = await axios.get(`${api_url}employe/${id}`);
        setEmploye(response.data);
        if (response.data.dateDebut) {
          setDateValue(response.data.dateDebut);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'employé.",
        });
      }
    };

    fetchParams();
    if (id) fetchEmploye();
  }, [params, toast, id]);

  useEffect(() => {
    const getPostesAndTypeContrats = async () => {
      try {
        const postesResponse = await axios.get(`${api_url}poste`);
        const typeContratsResponse = await axios.get(`${api_url}type-contrat`);

        setPostes(postesResponse.data);
        setTypeContrats(typeContratsResponse.data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données nécessaires",
        });
      }
    };

    getPostesAndTypeContrats();
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      employe: { id: (await params).id },
      poste: { id: Number(formData.get("id_poste")) },
      typeContrat: { id: Number(formData.get("id_type_contrat")) },
      dateDebut: formData.get("date_debut") as string,
      salaire: formData.get("salaire") as string,
    };
    console.log(data);
    try {
      await axios.post(`${api_url}employe/contrat`, data);
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
        <Label htmlFor="id_poste">Poste</Label>
        <Select name="id_poste" required>
          <SelectTrigger>
            <SelectValue placeholder="Choisir le poste">
              {employe?.contrat?.poste?.id &&
                postes &&
                postes.find((poste) => poste.id === employe.contrat.poste.id)?.titre}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {postes &&
              postes.map((poste) => (
                <SelectItem value={`${poste.id}`} key={poste.id}>
                  {poste.titre}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="id_type_contrat">Type de Contrat</Label>
        <Select name="id_type_contrat" required>
          <SelectTrigger>
            <SelectValue placeholder="Choisir le type de contrat">
              {employe?.contrat?.typeContrat?.id &&
                typeContrats &&
                typeContrats.find(
                  (contrat) => contrat.id === employe.contrat.typeContrat.id
                )?.nom}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {typeContrats &&
              typeContrats.map((contrat) => (
                <SelectItem value={`${contrat.id}`} key={contrat.id}>
                  {contrat.nom}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="date_debut">Date de Début</Label>
        <Input
          type="date"
          id="date_debut"
          name="date_debut"
          value={dateValue || ""}
          onChange={(e) => setDateValue(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="salaire">Salaire</Label>
        <Input
          type="text"
          id="salaire"
          name="salaire"
          placeholder="Entrer le salaire"
          defaultValue={employe?.contrat?.salaire || ""}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Soumettre
      </Button>
    </form>
  );
};

export default ContratForm;