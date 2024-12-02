"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api_url, CandidatDetail } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import {
  ClipboardList,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getStatusColor,
} from "@/components/ui/code-color";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const [candidat, setCandidat] = useState<CandidatDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Await the params Promise
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchCandidat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api_url}candidat/${id}`);
        setCandidat(response.data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du candidat.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCandidat();
  }, [id, toast]);

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Détails du Candidat"
          description="Informations sur le candidat et ses postulations"
        />
        <Link href="/back-office/talent/identification/candidats">
          <Button variant="outline" size="sm">
            ← Retour
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              <User className="h-5 w-5" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfo candidat={candidat} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              <ClipboardList className="h-5 w-5" />
              Liste des Postulations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {candidat?.postulations && candidat.postulations.length > 0 ? (
              <ul className="space-y-4">
                {candidat.postulations.map((postulation) => (
                  <li
                    key={postulation.id}
                    className="p-4 bg-secondary/10 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">
                        Poste : {postulation.offreEmploi.poste.titre}
                      </h3>
                      <Badge
                        className={`${getStatusColor(postulation.status)} px-3`}
                      >
                        {postulation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Publié le :{" "}
                      {new Date(postulation.datePostulation).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Description : {postulation.offreEmploi.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune postulation disponible.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PersonalInfo({ candidat }: { candidat: CandidatDetail | null }) {
  return (
    <div className="space-y-4">
      <InfoRow icon={<User />} label="Nom complet">
        {`${candidat?.prenom} ${candidat?.nom}`}
      </InfoRow>
      <InfoRow icon={<Mail />} label="Email">
        {candidat?.email}
      </InfoRow>
      <InfoRow icon={<Phone />} label="Téléphone">
        {candidat?.telephone || "N/A"}
      </InfoRow>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  );
}

function SkeletonPage() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
