"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api_url, CandidaturData } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import {
  Award,
  Building2,
  Calendar,
  ClipboardList,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getNiveauColor,
  getNoteColor,
  getStatusColor,
} from "@/components/ui/code-color";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Default candidate data
const defaultCandidat: CandidaturData = {
  id: 0,
  nom: "Non trouvé",
  prenom: "Inconnu",
  email: "non.trouve@email.com",
  telephone: "0000000000",
  dateCandidature: "00000000",
  poste: {
    id: 0,
    titre: "Non spécifié",
    description: "Aucune description disponible.",
    departement: "Non spécifié",
  },
  competences: [],
  notes: [],
  status: "En attente",
  isEligible: false,
};

export default function CandidateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const [candidat, setCandidat] = useState<CandidaturData>(defaultCandidat);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);

  // Unwrap `params` in useEffect
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    };
    unwrapParams();
  }, [params]);

  // Fetch candidate data
  useEffect(() => {
    if (!id) return;

    const fetchCandidat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api_url + `candidat/${id}`);
        const data: CandidaturData = response.data;
        console.log(data);
        setCandidat(data);
      } catch (error) {
        console.error(error);
        setCandidat(defaultCandidat); // Set to default if error occurs
      } finally {
        setLoading(false);
      }
    };
    fetchCandidat();
  }, [id]);

  // Function to handle candidate hiring
  const embaucher = async () => {
    if (!candidat?.id) return; // Ensure the candidate exists
    alert(`Candidat ${candidat?.prenom} ${candidat?.nom} embauché!`);
    try {
      await axios.get(api_url + `/${candidat?.id}`);
      toast({
        variant: "default",
        title: "Success",
        description: `${candidat?.prenom} ${candidat?.nom} a été embauché avec succès!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Error",
        description: "Erreur lors de l'approbation de l'embauche",
      });
    }
    // Additional logic to update candidate status in the database can go here
  };

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Personal Info Skeleton */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-10 w-1/3" />
            </CardContent>
          </Card>

          {/* Middle Column - Job Details Skeleton */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-1/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />

              <div className="space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Détails du Candidat"
          description="Details concernant le candidat"
        />
        <Link href={`/back-office/talent/identification/candidats`}>
          <Button variant="outline" size="sm">
            ← Retour à la liste
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="font-medium">{`${candidat?.prenom} ${candidat?.nom}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{candidat?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{candidat?.telephone || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Date de candidature
                  </p>
                  <p className="font-medium">
                    {new Date(candidat?.dateCandidature).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Badge
                  className={`${getStatusColor(
                    candidat?.status || "En attente"
                  )} px-3 py-1`}
                >
                  {candidat?.status}
                </Badge>
              </div>
              {candidat?.isEligible ? (
                <Button onClick={embaucher}>Embauche le candidat</Button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Job Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Poste Concerné
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">
                  {candidat?.poste.titre}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Département: {candidat?.poste.departement}
                </p>
                <p className="mt-4">{candidat?.poste.description}</p>
              </div>

              {/* Compétences Section */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Compétences
                </h4>
                {candidat?.competences.length > 0 ? (
                  <div className="space-y-2">
                    {candidat?.competences.map((comp) => (
                      <div
                        key={comp.id}
                        className={`flex items-center justify-between bg-secondary/20 p-2 rounded`}
                      >
                        <span>{comp.nom}</span>
                        <Badge
                          className={`${getNiveauColor(comp.niveau)} px-3 py-1`}
                        >
                          Niveau: {comp.niveau}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Aucune compétence spécifiée.</p>
                )}
              </div>
              {/* Notes Section */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Notes
                </h4>
                {candidat.notes.length > 0 ? (
                  <div className="space-y-2">
                    {candidat.notes.map((note) => (
                      <div
                        key={note.typeNote.id}
                        className={`bg-secondary/20 p-2 rounded ${getNoteColor(
                          note.note ?? 0
                        )}`}
                      >
                        <Badge
                          className={`${getNoteColor(note.note)} px-3 py-1`}
                        >
                          {note.typeNote.nomType} : {note.note}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucune note disponible.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
