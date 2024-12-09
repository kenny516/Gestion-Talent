"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api_url } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ClipboardList, Mail, Phone, User } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export type EmployeDetail = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateEmbauche: string;
  contrat: {
    id: number;
    poste: {
      id: number;
      titre: string;
      description: string;
      departement: string;
      categoriePersonnel: {
        id: number;
        nom: string;
        description: string;
      };
      details: Array<{
        competence: {
          id: number;
          nom: string;
          description: string;
        };
      }>;
    };
    typeContrat: {
      id: number;
      nom: string;
      dureeMois: number;
    };
    dateDebut: string;
    dateFin: string;
    salaire: number;
    tauxHoraire: number;
  };
};

export default function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [employe, setEmploye] = useState<EmployeDetail | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
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

    const fetchEmploye = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api_url}employe/${id}`);
        setEmploye(response.data);
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

    fetchEmploye();
  }, [id, toast]);

  const goto = (link: string) => {
    setLoading(true);
    router.push(link);
  };

  if (isLoading) {
    return <SkeletonPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Détails de l'Employé"
          description="Informations détaillées sur l'employé"
        />
        <Link href="/back-office/talent/employees">
          <Button variant="outline" size="sm">
            ← Retour
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-start gap-5">
              <div>Informations Personnelles</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfo candidat={employe} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-start gap-2">
              <ClipboardList className="h-5 w-5 float-left" />
              <div> Contrat actuel</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {employe?.contrat ? (
              <div className="space-y-4">
                {/* info */}
                <p className="text-sm">
                  <strong>Poste :</strong> {employe.contrat.poste.titre}
                </p>
                <p className="text-sm">
                  <strong>Département :</strong>{" "}
                  {employe.contrat.poste.departement}
                </p>
                <p className="text-sm">
                  <strong>Catégorie Personnel :</strong>{" "}
                  {employe.contrat.poste.categoriePersonnel.nom}
                </p>
                <p className="text-sm">
                  <strong>Type de Contrat :</strong>{" "}
                  {employe.contrat.typeContrat.nom}
                </p>
                <p className="text-sm">
                  <strong>Durée (mois) :</strong>{" "}
                  {employe.contrat.typeContrat.dureeMois}
                </p>
                <p className="text-sm">
                  <strong>Date de Début :</strong>{" "}
                  {new Date(employe.contrat.dateDebut).toLocaleDateString(
                    "fr-FR"
                  )}
                </p>
                <p className="text-sm">
                  <strong>Date de Fin :</strong>{" "}
                  {new Date(employe.contrat.dateFin).toLocaleDateString(
                    "fr-FR"
                  )}
                </p>
                <p className="text-sm">
                  <strong>Salaire :</strong> {employe.contrat.salaire} MGA
                </p>
                <p className="text-sm">
                  <strong>Taux Horaire :</strong>{" "}
                  {employe.contrat.tauxHoraire.toFixed(2)} MGA
                </p>
              </div>
            ) : (
              <p className="text-muted">Aucun contrat disponible.</p>
            )}
            <div className=" w-full mt-5 h-10  flex justify-start gap-3">
              <Button
                onClick={() =>
                  goto(
                    `/back-office/talent/identification/employees/${id}/contrat`
                  )
                }
                className="bg-slate-900 hover:text-slate-900 hover:bg-slate-50 "
              >
                modifier le contrat
              </Button>
							<Button
                onClick={() =>
                  goto(
                    `/back-office/talent/identification/employees/${id}/rupture`
                  )
                }
								variant={"destructive"}
                className="bg-slate-900"
              >
                rompre le contrat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PersonalInfo({ candidat }: { candidat: EmployeDetail | null }) {
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
