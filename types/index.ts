// export types for individual tables

export const api_url = "http://localhost:8080/gestion_talent/api/";// export types for each table in the database
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
    status?: 'En attente' | 'Retenu' | 'Refusé';
};

export type TypeNote = {
    id: number;
    nomType: string;
};

export type NoteCandidat = {
    idCandidat: number;
    idTypeNote: number;
    note?: number;
};

export type Employe = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    dateCandidature?: string;
    poste: Poste;
    competence?:Competence[];
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

export type CompetencesEmployes = {
    employe_id: number;
    competence_id: number;
    niveau: 1 | 2 | 3 | 4 | 5;
};

export type CompetencesCandidats = {
    candidat_id: number;
    competence_id: number;
    niveau: 1 | 2 | 3 | 4 | 5;
};

/// my object

export type CandidaturData={
    candidat:Candidat;
    competence: CompetencesCandidats[];
}


// Optional function and trigger types to represent trigger and functions in TypeScript (informative, not executable)
export type EvaluerStatutCandidat = () => void;

export type TriggerEvaluerStatutCandidat = {
    event: 'AFTER INSERT';
    table: 'CompetencesCandidats';
    action: EvaluerStatutCandidat;
};
