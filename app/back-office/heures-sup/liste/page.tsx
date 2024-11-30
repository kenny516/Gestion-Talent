import { useEffect, useState } from 'react';

interface HeureSup {
    id: number;
    idEmploye: number;
    dateDebut: string;
    dateFin: string;
    totalHeuresSup: number;
    montant: number;
}

export default function ListeHeuresSup() {
    const [heuresSup, setHeuresSup] = useState<HeureSup[]>([]);

    useEffect(() => {
        const fetchHeuresSup = async () => {
            try {
                const response = await fetch('/api/heures-sup');
                if (response.ok) {
                    const data: HeureSup[] = await response.json();
                    setHeuresSup(data);
                } else {
                    console.error('Erreur lors du chargement :', response.statusText);
                }
            } catch (error) {
                console.error('Erreur réseau :', error);
            }
        };
        fetchHeuresSup();
    }, []);

    return (
        <div>
            <h1>Liste des Heures Supplémentaires à Venir</h1>
            <ul>
                {heuresSup.map((heure) => (
                    <li key={heure.id}>
                        Employé : {heure.idEmploye} | Début : {heure.dateDebut} | Fin : {heure.dateFin} | Total :{' '}
                        {heure.totalHeuresSup} heures | Montant : {heure.montant} Ar
                    </li>
                ))}
            </ul>
        </div>
    );
}
