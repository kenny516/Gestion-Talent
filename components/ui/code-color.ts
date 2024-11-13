export const getNiveauColor = (niveau: number) => {
  if (niveau <= 2) {
    return "bg-red-500 text-white"; // Niveau faible
  } else if (niveau === 3) {
    return "bg-yellow-500 text-white"; // Niveau moyen
  } else {
    return "bg-green-500 text-white"; // Niveau élevé
  }
};

export const getNoteColor = (note: number) => {
  if (note <= 5) {
    return "bg-red-500 text-white"; // Note faible
  } else if (note <= 8) {
    return "bg-yellow-500 text-white"; // Note moyenne
  } else {
    return "bg-green-500 text-white"; // Note élevée
  }
};
