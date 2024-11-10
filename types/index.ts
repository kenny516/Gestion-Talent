// Types for individual tables

export type Poste = {
  id: number;
  titre: string;
  description?: string;
  departement?: string;
};

export type Candidat = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  date_candidature: string;
  poste: Poste;
};

export type TypeNote = {
  id: number;
  nomType: string;
};

export type NoteCandidat = {
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
  date_embauche: string;
  poste_id: number;
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
  dureeMois: number;
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
  niveau: number;
};

export type CompetencesCandidats = {
  candidat_id: number;
  competence_id: number;
  niveau: number;
};

// Main interface encapsulating all tables
export interface GestionTalentDatabase {
  Postes: Poste[];
  Candidats: Candidat[];
  TypeNotes: TypeNote[];
  NoteCandidats: NoteCandidat[];
  Employes: Employe[];
  PostEmployes: PostEmploye[];
  TypeContrats: TypeContrat[];
  ContratEmployes: ContratEmploye[];
  Competences: Competence[];
  DetailsPostes: DetailsPoste[];
  CompetencesEmployes: CompetencesEmployes[];
  CompetencesCandidats: CompetencesCandidats[];
}
