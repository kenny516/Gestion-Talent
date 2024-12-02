// export types for individual tables

import { number } from "zod";

export const api_url = process.env.NEXT_PUBLIC_API_URL; // export types for each table in the database
// Types for each table in the database
export type Poste = {
  id: number;
  titre: string;
  description: string;
  departement: string;
  categoriePersonnel: CategoriePersonnel;
};

export type Candidat = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  postulations: [
    {
      id: 1;
      candidat: null;
      poste: {
        id: number;
        titre: string;
        description: string;
        departement: string;
      };
      status: "En attente" | "Retenu" | "Refusé" | "Embauché";
      datePostulation: string;
    }
  ];
};

export type CandidatDisplay = {
    id: number;
    candidatId: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    datePostulation: string;
    offreStatus: boolean;
    status:string;
    poste: Poste;
  };


export type TypeNote = {
  id: number;
  nomType: string;
};

export type NoteCandidat = {
  idCandidat: number;
  typeNote: TypeNote;
  note: number;
};
export type NoteCandidatForm = {
  idCandidat: number;
  idTypeNote: number;
  note: number;
};

export type CategoriePersonnel = {
  id: number;
  nom: string;
  description: string;
};

export type TypeContrat = {
  id: number;
  nomType: string;
  dureeMois: number;
};

export type Contrat = {
  id: number;
  employe: Employe;
  poste: Poste;
  typeContrat: TypeContrat;
  dateDebut: string;
  dateFin: string;
  salaire: number;
  tauxHoraire: number;
};

export type Employe = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateEmbauche?: string;
  contrat:Contrat;
};

export type PostEmploye = {
  id: number;
  idEmploye: number;
  idPoste: number;
  dateDebut: string;
  dateFin?: string;
};

export type ContratEmploye = {
  idEmploye: number;
  idContrat: number;
  dateDebut: string;
  dateFin: string;
};

export type Competence = {
  id: number;
  nom: string;
  description?: string;
};

export type DetailsPoste = {
  idPoste: number;
  idCompetence: number;
};

export type CompetencesEmployes = Competence & {
  employe_id: number;
  niveau: 1 | 2 | 3 | 4 | 5;
};

export type CompetencesCandidats = {
  candidat_id: number;
  competence: Competence;
  niveau: 0 | 1 | 2 | 3 | 4 | 5;
};
export type NotificationType = {
  id: number;
  message: string;
  dateHeure: string; // Format ISO 8601 recommandé : "2023-05-15T14:30:00Z"
  status: string;
};
export type Experience = {
  experienceId: number;
  dateDebut: string; //
  dateFin?: string;
  description: string;
  candidatId: number;
};

export type Formation = {
  idFormation: number;
  dateDebut: string;
  dateFin?: string;
  description: string;
  candidatId: number;
};

export type Diplome = {
  id: number;
  diplome: string;
  niveau: number;
};

export type CandidatsDiplomes = {
  candidatId: number;
  diplomeId: number;
};

/// my object

export type CandidaturData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateCandidature: string;
  poste: Poste;
  status: "En attente" | "Retenu" | "Refusé" | "Embauché";
  competences: CompetencesCandidats[];
  notes: NoteCandidat[];
  progress: number;
};

export type offreEmploi = {
    id:number;
    description:string;
    status:boolean;
    datePublication:string;
    poste: Poste;
    nbrCandidatDm:number;
    salaire:number;
}

export type Postulation  = {
    id:number;
    offreEmploi:offreEmploi;
    status: string;
    datePostulation: string;
    notes:NoteCandidat[];
}



export type CandidatDetail = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  formations: Formation[];
  experiences: Experience[];
  diplomes: Diplome[];
  postulations:Postulation[];
  competences:CompetencesCandidats[];
  progress: number;
};
export type PosteCompetenceData = {
  poste: Poste;
  competence: CompetencesEmployes[];
};

export type suivie = {
  id: number;
  progress: number;
  postulations: [
    {
      id: 1;
      candidat: null;
      poste: {
        id: number;
        titre: string;
        description: string;
        departement: string;
      };
      status: "En attente" | "Retenu" | "Refusé" | "Embauché";
      datePostulation: string;
    }
  ];
  notes: NoteCandidat[];
  currentStep: number;
};

export type AvanceImpaye = {
  id: number;
  idEmploye: number;
  montant: number;
  pourcentageDebitable: number;
  dateAvance: string;
  raison: string;
  restePaye: number;
  nom: string;
  prenom: string;
}

//auth
export type tokenUser = {
  id: number;
  nom: string;
};
// conge
export type TypeConge = {
  id: number;
  nom: string;
  estPaye: boolean;
  cumulable: boolean;
  dureeMax: number;
};
export type Conge = {
  id?: number;
  idTypeConge: TypeConge;
  dateDebut: string;
  dateFin: string;
  duree: number;
  status: string;
  employe: Employe;
};

// Optional function and trigger types to represent trigger and functions in TypeScript (informative, not executable)
export type EvaluerStatutCandidat = () => void;

export type TriggerEvaluerStatutCandidat = {
  event: "AFTER INSERT";
  table: "CompetencesCandidats";
  action: EvaluerStatutCandidat;
};


export type paye={
    EmployeId: number;
    datePaiement:string;
}

export type 
