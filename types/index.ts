// export types for individual tables

export const api_url = process.env.NEXT_PUBLIC_API_URL; // export types for each table in the database
// Types for each table in the database
export type Poste = {
  id: number;
  titre: string;
  description: string;
  departement: string;
};

export type Candidat = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateCandidature: string;
  poste: Poste;
  status?: "En attente" | "Retenu" | "Refusé" | "Embauché";
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

export type Employe = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateEmbauche?: string;
  poste: Poste;
  competences?: Competence[];
};

export type PostEmploye = {
  id: number;
  idEmploye: number;
  idPoste: number;
  dateDebut: string;
  dateFin?: string;
};

export type TypeContrat = {
  id: number;
  nomType: string;
  dureeMois?: number;
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

export type CompetencesCandidats = Competence & {
  candidat_id: number;
  niveau: 0|1 | 2 | 3 | 4 | 5;
};
export type NotificationType = {
  id: number;
  destinataire: string;
  message: string;
  dateHeure: string; // Format ISO 8601 recommandé : "2023-05-15T14:30:00Z"
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
  idDiplome: number;
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
export type CandidatDetail ={
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    formations: Formation[];
    experiences: Experience[];
    diplomes: Diplome[];
    notes: NoteCandidat[];
    competences: CompetencesCandidats[];
    status: "En attente" | "Retenu" | "Refusé" | "Embauché";
    progress: number;
}
export type PosteCompetenceData = {
  poste: Poste;
  competence: CompetencesEmployes[];
};

export type suivie = {
  id: number;
  status: "En attente" | "Retenu" | "Refusé";
  progress: number;
  poste: Poste;
  notes: NoteCandidat[];
  currentStep: number;
};

//auth
export type tokenUser = {
  id: number;
  nom: string;
};
// Optional function and trigger types to represent trigger and functions in TypeScript (informative, not executable)
export type EvaluerStatutCandidat = () => void;

export type TriggerEvaluerStatutCandidat = {
  event: "AFTER INSERT";
  table: "CompetencesCandidats";
  action: EvaluerStatutCandidat;
};
