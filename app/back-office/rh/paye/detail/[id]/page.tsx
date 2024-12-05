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
import { api_url, FichePaye } from "@/types";
import axios from "axios";
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
  const [payeId, setPayeId] = useState<number>(0);
  const [dataPaye, setDataPaye] = useState<FichePaye>();

  useEffect(() => {
    const getEmpId = async () => {
      const paie = await params;
      setPayeId(paie.id);
    };
    getEmpId();
  }, []);

  useEffect(()=>{
    const fetch = async () => {
        const response = axios.get(api_url+`paye/${payeId}`);
        const data : FichePaye = (await response).data as FichePaye;
        setDataPaye(data);
    };
    fetch();
  })

  const payrollData = {
    employeeName: dataPaye?.nom,
    matricule: dataPaye?.id,
    classification: "HC",
    fonction: dataPaye?.posteTitre,
    cnaps: "",
    dateEmbauche: dataPaye?.dateEmbauche,
    anciennete: "12 an(s) 5 mois et 10 jour(s)",
    salaireBase: dataPaye?.contratSalaire,
    tauxJournalier: dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 ,
    tauxHoraire: dataPaye?.contratTauxHoraire,
    indice: 17660.0,
  };

  const entries: PayrollEntry[] = [
    {
      designation: "Err :502",
      nombre: "1 mois",
      taux: dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 ,
      montant: dataPaye?.contratSalaire,
    },
    { designation: "Absences déductibles", taux:dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 , montant: dataPaye?.payeNbHeureAbs },
    { designation: "Primes de rendement", montant: 0 },
    { designation: "Primes d'ancienneté", montant: 0 },
    {
      designation: "Heures supplémentaires total",
      taux: dataPaye?.payeHeureSup,
      montant: 0.0,
    },
    { designation: "Primes diverses", montant: 0 },
    { designation: "Rappels sur période antérieure", montant: 0 },
    { designation: "Droits de congés", taux: dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 , montant: 0.0 },
    { designation: "Droits de préavis", taux: dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 , montant: 0.0 },
    { designation: "Indemnités de licenciement", taux:dataPaye?.contratTauxHoraire === undefined ? 0 : dataPaye?.contratTauxHoraire * 8 , montant: 0.0 },
  ];

  const irsaBrackets: IRSABracket[] = [
    { label: "Tranche IRSA INF 350 0000", taux: 0, montant: 0 },
    { label: "Tranche IRSA I DE 350 0001 à 400 000", taux: 5, montant: 2500.0 },
    {
      label: "Tranche IRSA I DE 400 0001 à 500 000",
      taux: 10,
      montant: 10000.0,
    },
    {
      label: "Tranche IRSA I DE 500 001 à 600 000",
      taux: 15,
      montant: 15000.0,
    },
    { label: "Tranche IRSA SUP 600 0000", taux: 20, montant: 684515.0 },
  ];

  const deductions = {
    retenueCNaPS: dataPaye?.payeCnaps,
    retenueSanitaire: dataPaye?.payeSanitaire,
    totalIRSA: dataPaye?.payeIrsa,
    totalRetenues: dataPaye?.payeTotal,
    autresIndemnites: 0,
    netAPayer: 3310560.0,
    montantImposable: 4022575.0,
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
                  {deductions.netAPayer.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Footer Information */}
        <div className="mt-6 space-y-2">
          <p>Avantages en nature :</p>
          <p>Déductions IRSA :</p>
          <p>
            Montant imposable : {deductions.montantImposable.toLocaleString()}
          </p>
          <p>Mode de paiement : Virement/chèque</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 border-t">
        <div className="text-center">
          <p className="font-medium mb-8">L employeur</p>
          <div className="h-[60px]"></div>
        </div>
        <div className="text-center">
          <p className="font-medium mb-8">L employé(e)</p>
          <div className="h-[60px]"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
