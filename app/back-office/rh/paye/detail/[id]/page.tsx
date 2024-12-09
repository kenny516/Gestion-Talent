"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api_url, FichePaye, PaieType } from "@/types";
import axios from "axios";
import { Signature } from "lucide-react";
import { useEffect, useState } from "react";

interface PayrollEntry {
  designation: string;
  nombre?: string | number;
  taux?: number;
  montant?: number;
}

interface IRSABracket {
  label: string;
  taux: number;
  montant?: number;
}

export default function Payslip({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [payeId, setPayeId] = useState<number | null>(null);
  const [payeDetails, setPayeDetails] = useState<FichePaye | null>(null);
  const [dataPaye, setDataPaye] = useState<PaieType | null>(null);

  // Fetch and set `payeId` from `params`
  useEffect(() => {
    const getPayeId = async () => {
      const paie = await params;
      setPayeId(paie.id);
    };
    getPayeId();
  }, [params]);

  // Fetch data based on `payeId`
  useEffect(() => {
    if (!payeId) return; // Prevent fetch if payeId is null
    const fetchData = async () => {
      try {
        const response = await axios.get(api_url + `paye/${payeId}`);
        const data: PaieType[] = response.data as PaieType[];
        setDataPaye(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.error("Error fetching paye data:", error);
      }
    };
    fetchData();
  }, [payeId]);

  // Fetch paye details based on `dataPaye`
  useEffect(() => {
    if (!dataPaye?.employe.id || !dataPaye.mois || !dataPaye.annee) return; // Prevent fetch if required data is missing
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          api_url +
            `payedetails/${dataPaye.employe.id}?mois=${dataPaye.mois}&annee=${dataPaye.annee}`
        );
        const data: FichePaye = response.data as FichePaye;
        setPayeDetails(data);
      } catch (error) {
        console.error("Error fetching paye details:", error);
      }
    };
    fetchDetails();
  }, [dataPaye]);

  const payrollData = {
    employeeName: payeDetails?.nom,
    matricule: payeDetails?.id,
    classification: "HC",
    fonction: payeDetails?.titre,
    cnaps: "",
    dateEmbauche: payeDetails?.dateEmbauche,
    anciennete: "12 an(s) 5 mois et 10 jour(s)",
    salaireBase: payeDetails?.salaireBase,
    tauxJournalier:
      payeDetails?.tauxHoraire === undefined ? 0 : payeDetails?.tauxHoraire * 8,
    tauxHoraire: payeDetails?.tauxHoraire,
    indice: 17660.0,
  };

  const entries: PayrollEntry[] = [
    {
      designation: "Err :502",
      nombre: "1 mois",
      taux:
        payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8,
      montant:
        (payeDetails?.nbHeureAbs ?? 0) *
        (payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8),
    },
    {
      designation: "Absences déductibles",
      taux:
        payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8,
      montant: payeDetails?.tauxHoraire,
    },
    /*    { designation: "Primes de rendement", montant: 0 },
    { designation: "Primes d'ancienneté", montant: 0 },*/
    {
      designation: "Heures supplémentaires 30%",
      taux: payeDetails?.heureSup30,
      montant: payeDetails?.heureSup30,
    },
    {
      designation: "Heures supplémentaires 40%",
      taux: payeDetails?.heureSup40,
      montant: payeDetails?.heureSup40,
    },
    {
      designation: "Heures supplémentaires 50%",
      taux: payeDetails?.heureSup50,
      montant: payeDetails?.heureSup50,
    },
    {
      designation: "Heures supplémentaires 100%",
      taux: payeDetails?.heureSup100,
      montant: payeDetails?.heureSup100,
    },
    { designation: "Primes diverses", montant: payeDetails?.primeDiverse },
    /*{ designation: "Rappels sur période antérieure", montant: 0 },*/
    {
      designation: "Droits de congés",
      taux:
        payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8,
      montant: payeDetails?.droitConge,
    },
    {
      designation: "Droits de préavis",
      taux:
        payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8,
      montant: payeDetails?.droitPreavis,
    },
    {
      designation: "Indemnités de licenciement",
      taux:
        payeDetails?.tauxHoraire === undefined
          ? 0
          : payeDetails?.tauxHoraire * 8,
      montant: payeDetails?.indemnite,
    },
  ];

  const irsaBrackets: IRSABracket[] = [
    { label: "Tranche IRSA INF 350 0000", taux: 0, montant: payeDetails?.irsa },
    {
      label: "Tranche IRSA I DE 350 0001 à 400 000",
      taux: 5,
      montant: payeDetails?.irsa5,
    },
    {
      label: "Tranche IRSA I DE 400 0001 à 500 000",
      taux: 10,
      montant: payeDetails?.irsa10,
    },
    {
      label: "Tranche IRSA I DE 500 001 à 600 000",
      taux: 15,
      montant: payeDetails?.irsa15,
    },
    {
      label: "Tranche IRSA SUP 600 0000",
      taux: 20,
      montant: payeDetails?.irsa20,
    },
  ];
  // a demander irsa
  const deductions = {
    retenueCNaPS: payeDetails?.cnaps,
    retenueSanitaire: payeDetails?.sanitaire,
    totalIRSA: payeDetails?.irsa,
    totalRetenues: (payeDetails?.salaireBase ?? 0) - (payeDetails?.total ?? 0),
    autresIndemnites: 0,
    netAPayer: payeDetails?.total,
    montantImposable: 0,
  };

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardHeader className="text-center border-b">
        <CardTitle className="text-2xl font-bold">FICHE DE PAIE</CardTitle>
        <p className="text-sm font-medium">ARRETE AU 31/08/23</p>
      </CardHeader>

      <CardContent className="p-6">
        {/* Employee Information Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6">
          <div className="space-y-2">
            <p>
              <span className="font-medium">Nom et Prénoms :</span>{" "}
              {payrollData.employeeName}
            </p>
            <p>
              <span className="font-medium">Matricule :</span>{" "}
              {payrollData.matricule}
            </p>
            <p>
              <span className="font-medium">Fonction :</span>{" "}
              {payrollData.fonction}
            </p>
            <p>
              <span className="font-medium">N° CNaPS :</span>{" "}
              {payrollData.cnaps}
            </p>
            <p>
              <span className="font-medium">Date dembauche :</span>{" "}
              {payrollData.dateEmbauche}
            </p>
            <p>
              <span className="font-medium">Ancienneté :</span>{" "}
              {payrollData.anciennete}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Classification :</span>{" "}
              {payrollData.classification}
            </p>
            <p>
              <span className="font-medium">Salaire de base :</span>{" "}
              {payrollData?.salaireBase?.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Taux journaliers :</span>{" "}
              {payrollData.tauxJournalier.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Taux horaires :</span>{" "}
              {payrollData.tauxHoraire?.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Indice :</span>{" "}
              {payrollData.indice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40%]">Désignations</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Taux</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.designation}</TableCell>
                <TableCell>{entry.nombre || ""}</TableCell>
                <TableCell className="text-right">
                  {entry.taux?.toLocaleString() || ""}
                </TableCell>
                <TableCell className="text-right">
                  {entry?.montant?.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-medium">
              <TableCell colSpan={3} className="text-right">
                Salaire brut
              </TableCell>
              <TableCell className="text-right">
                {payrollData.salaireBase?.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Deductions Table */}
        <div className="mt-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>Retenue CNaPS 1%</TableCell>
                <TableCell className="text-right">
                  {deductions.retenueCNaPS?.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Retenue sanitaire</TableCell>
                <TableCell className="text-right">
                  {deductions.retenueSanitaire?.toLocaleString()}
                </TableCell>
              </TableRow>
              {irsaBrackets.map((bracket, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>{bracket.label}</TableCell>
                  <TableCell className="text-right">{bracket.taux}%</TableCell>
                  <TableCell className="text-right">
                    {bracket.montant?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell colSpan={3}>TOTAL IRSA</TableCell>
                <TableCell className="text-right">
                  {deductions.totalIRSA?.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell colSpan={3}>Total des retenues</TableCell>
                <TableCell className="text-right">
                  {deductions.totalRetenues?.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Autres indemnités</TableCell>
                <TableCell className="text-right">
                  {deductions.autresIndemnites.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow className="font-bold text-lg">
                <TableCell colSpan={3}>Net à payer</TableCell>
                <TableCell className="text-right">
                  {deductions?.netAPayer?.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Footer Information */}
        <div className="mt-6 space-y-2">
          <p>
            Montant imposable : {deductions.montantImposable.toLocaleString()}
          </p>
          <p>Mode de paiement : Virement/chèque</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 border-t">
        <div className="text-center">
          <p className="font-medium mb-8">L employeur</p>
          <Signature />
          <div className="h-[60px]"></div>
        </div>
        <div className="text-center">
          <p className="font-medium mb-8">L employé(e)</p>
          <Signature />
          <div className="h-[60px]"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
