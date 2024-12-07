"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api_url, Candidat, suivie, TypeNote } from "@/types";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Loader2,
  User2,
} from "lucide-react";
import { getStatusColor } from "./ui/code-color";

const fetchCandidates = async (): Promise<Candidat[]> => {
  try {
    const response = await axios.get(api_url + "candidat");
    return response.data as Candidat[];
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

const fetchCandidatDetail = async (
  idCandidat: number
): Promise<suivie | null> => {
  try {
    const response = await axios.get(`${api_url}candidat/${idCandidat}`);
    return response.data as suivie;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return null;
  }
};

const fetchTypenote = async (): Promise<TypeNote[]> => {
  try {
    const response = await axios.get(`${api_url}type-note`);
    return response.data as TypeNote[];
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return [];
  }
};

export function ApplicationStatus() {
  const [suivie, setSuivie] = useState<suivie | null>(null);
  const [idCandidate, setIdCandidate] = useState<number | null>(null);
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [typeNote, setTypeNote] = useState<TypeNote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      const data = await fetchCandidates();
      setCandidats(data);
    };
    getCandidates();
  }, []);

  useEffect(() => {
    const getTypeNotes = async () => {
      const data = await fetchTypenote();
      setTypeNote(data);
    };
    getTypeNotes();
  }, []);

  useEffect(() => {
    if (idCandidate !== null) {
      const loadSuivie = async () => {
        setLoading(true);
        const data = await fetchCandidatDetail(idCandidate);
        setSuivie(data);
        setLoading(false);
      };
      loadSuivie();
    }
  }, [idCandidate]);

  const selectedCandidat = candidats.find((c) => c.id === idCandidate);

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-background border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Suivi de Candidature
          </CardTitle>
          <CardDescription>
            Sélectionnez un candidat pour voir le statut de sa candidature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setIdCandidate(Number(value))}>
            <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 transition-colors">
              <SelectValue placeholder="Sélectionner un candidat" />
            </SelectTrigger>
            <SelectContent>
              {candidats.map((candidat) => (
                <SelectItem
                  key={candidat.id}
                  value={candidat.id.toString()}
                  className="flex items-center space-x-2"
                >
                  {candidat.nom} {candidat.prenom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground animate-pulse">
            Chargement du suivi...
          </span>
        </div>
      ) : suivie ? (
        <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl dark:hover:shadow-primary/5 border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-primary/10">
            <div className="flex flex-col space-y-4">
              {selectedCandidat && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User2 className="h-4 w-4" />
                  <span>
                    {selectedCandidat.nom} {selectedCandidat.prenom}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-xl shadow-sm ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary text-lg">
                      {suivie.postulations[0].poste?.titre || "Non spécifié"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {suivie.postulations[0].poste?.departement ||
                        "Non spécifié"}
                    </span>
                  </div>
                </span>
                <Badge
                  variant="outline"
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-transform duration-300 group-hover:scale-105 ${getStatusColor(
                    suivie.postulations[0].status || "En attente"
                  )}`}
                >
                  {suivie.postulations[0].status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-primary/80 font-medium">Progression</span>
                <span className="text-primary font-bold">
                  {suivie.progress}%
                </span>
              </div>
              <Progress
                value={suivie.progress}
                className="h-3 bg-primary/10 rounded-full"
              />
            </div>

            <div className="grid grid-flow-col auto-cols-fr gap-2 pt-4">
              {typeNote.map((step, index) => (
                <div
                  key={step.id || index}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 
                      ${
                        index < suivie.currentStep
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-100"
                          : "bg-muted/50 text-muted-foreground scale-90 hover:scale-95"
                      }
                    `}
                  >
                    <CheckCircle2
                      className={`h-7 w-7 transition-all duration-500 
                        ${
                          index < suivie.currentStep
                            ? "scale-100 rotate-0"
                            : "scale-75 opacity-50 -rotate-45"
                        }
                      `}
                    />
                  </div>
                  <span
                    className={`mt-3 text-xs font-medium text-center transition-colors duration-300
                    ${
                      index < suivie.currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  `}
                  >
                    {step.nomType}
                  </span>
                  {index < typeNote.length - 1 && (
                    <ArrowRight
                      className={`absolute -right-3 top-4 w-6 h-6 transition-all duration-500
                        ${
                          index < suivie.currentStep - 1
                            ? "text-primary opacity-100"
                            : "text-muted-foreground opacity-40"
                        }
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-primary/20">
          <CardContent className="p-12 text-center space-y-4">
            <div className="flex justify-center">
              <User2 className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">
              Veuillez sélectionner un candidat pour afficher son suivi.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ApplicationStatus;
