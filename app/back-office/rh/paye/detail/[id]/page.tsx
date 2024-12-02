import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Types pour les données de la fiche de paie
interface PayslipData {
  employeeName: string;
  matricule: string;
  classification: string;
  fonction: string;
  dateEmbauche: string;
  anciennete: string;
  salaireBrut: number;
  salaireBase: number;
  tauxJournalier: number;
  tauxHoraire: number;
  cnaps: number;
  irsa: {
    total: number;
    tranches: Array<{label: string, taux: number, montant: number}>
  };
  netAPayer: number;
}

// Composant principal de la fiche de paie
const Payslip: React.FC = () => {
  // Données en dur - à remplacer par un appel API
  const payslipData: PayslipData = {
    employeeName: 'RAZAFIARISON Laza',
    matricule: '627/TNR',
    classification: 'HC',
    fonction: 'MPITOLONA',
    dateEmbauche: '03/25/2011',
    anciennete: '12 an(s) 5 mois et 10 jour(s)',
    salaireBrut: 4083409.09,
    salaireBase: 4083409.09,
    tauxJournalier: 136114.00,
    tauxHoraire: 23559.00,
    cnaps: 20000.00,
    irsa: {
      total: 712015.00,
      tranches: [
        { label: 'Tranche IRSA INF 350 000', taux: 0, montant: 0 },
        { label: 'Tranche IRSA I DE 350 001 à 400 000', taux: 5, montant: 2500.00 },
        { label: 'Tranche IRSA I DE 400 001 à 500 000', taux: 10, montant: 10000.00 },
        { label: 'Tranche IRSA I DE 500 001 à 600 000', taux: 15, montant: 15000.00 },
        { label: 'Tranche IRSA SUP 600 000', taux: 20, montant: 684515.00 }
      ]
    },
    netAPayer: 3310560.00
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="shadow-lg border-t-4 border-primary text-foreground">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-foreground">
          <CardTitle className="text-3xl font-bold text-center text-primary-foreground">FICHE DE PAIE</CardTitle>
          <p className="text-sm text-center mt-2 text-primary-foreground">ARRETE AU 31/08/23</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations Employé */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary mb-3">Informations Personnelles</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Nom et Prénoms:</span> {payslipData.employeeName}</p>
                <p><span className="font-medium">Matricule:</span> {payslipData.matricule}</p>
                <p><span className="font-medium">Classification:</span> {payslipData.classification}</p>
                <p><span className="font-medium">Fonction:</span> {payslipData.fonction}</p>
                <p><span className="font-medium">Date d embauche:</span> {payslipData.dateEmbauche}</p>
                <p><span className="font-medium">Ancienneté:</span> {payslipData.anciennete}</p>
              </div>
            </div>

            {/* Détails Salariaux */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary mb-3">Détails Salariaux</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Salaire de base:</span> {payslipData.salaireBase.toLocaleString()} Ar</p>
                <p><span className="font-medium">Taux journalier:</span> {payslipData.tauxJournalier.toLocaleString()} Ar</p>
                <p><span className="font-medium">Taux horaire:</span> {payslipData.tauxHoraire.toLocaleString()} Ar</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Sections IRSA et Retenues */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Détail des Retenues IRSA</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-primary/20 p-2 text-left">Tranche</th>
                    <th className="border border-primary/20 p-2 text-right">Taux</th>
                    <th className="border border-primary/20 p-2 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {payslipData.irsa.tranches.map((tranche, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted hover:bg-muted' : 'bg-background hover:bg-muted'}>
                      <td className="border border-primary/20 p-2">{tranche.label}</td>
                      <td className="border border-primary/20 p-2 text-right">{tranche.taux}%</td>
                      <td className="border border-primary/20 p-2 text-right">{tranche.montant.toLocaleString()} Ar</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted flex flex-col sm:flex-row justify-between p-6 space-y-4 sm:space-y-0">
          <div className="space-y-2">
            <p><span className="font-medium">Salaire Brut:</span> {payslipData.salaireBrut.toLocaleString()} Ar</p>
            <p><span className="font-medium">Retenue CNaPS (1%):</span> {payslipData.cnaps.toLocaleString()} Ar</p>
            <p><span className="font-medium">Total IRSA:</span> {payslipData.irsa.total.toLocaleString()} Ar</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">Net à Payer: {payslipData.netAPayer.toLocaleString()} Ar</p>
            <p className="text-sm mt-2">Mode de Paiement: Virement/Chèque</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payslip;

