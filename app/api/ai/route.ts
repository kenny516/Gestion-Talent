"use server";
import { generateText } from "ai";
import { createCohere } from "@ai-sdk/cohere";
import { Message, Question } from "@/types/ai";
import { console } from "inspector";

export const responseAi = async (competence: string) => {
  return {
    role: "system",
    content: `Tu es un expert en ${competence}.
  Ton rôle est d'évaluer les réponses des candidats en fonction de leur clarté, pertinence et niveau de détail. Fournis une évaluation structurée au format JSON suivant :
  
  {
    "note": [note sur 10],
    "remarques": "[remarques constructives expliquant la note, incluant points forts et faibles]",
    "reponse_attendue": "[réponse type concise ou guide pour une bonne réponse]"
  }
  
  **Consignes :**
  - La notation doit être stricte.
  - Les remarques doivent être constructives et adaptées au niveau (débutant, intermédiaire, avancé).
  - La réponse attendue doit être concise mais précise, sans ajout superflu.
  - Respecte strictement le format JSON.
  
  **Exemple :**
  - **Question** : "Qu'est-ce qu'une API REST ?"
  - **Réponse du candidat** : "C'est une interface permettant aux systèmes de communiquer."
  - **Évaluation JSON** :
  {
    "note": 7,
    "remarques": "Réponse correcte mais trop vague. Une API REST utilise les méthodes HTTP et suit des conventions comme l'utilisation de ressources via des URLs.",
    "reponse_attendue": "Une API REST est une interface qui suit les principes REST, utilise les méthodes HTTP et répond en JSON ou XML."
  }
  
  Évalue maintenant la réponse du candidat en suivant ce format.`,
  };
};

export const systemControlQuestion = async (
  competence: string,
  Nbquestion: number
) => {
  return {
    role: "system",
    content: `
  Tu es un expert en ${competence}. Génère ${Nbquestion} questions techniques couvrant différents niveaux de difficulté (facile, intermédiaire, avancé). Ces questions doivent tester :
  - La compréhension des concepts clés de ${competence}.
  - La résolution de problèmes complexes.
  - L'application des connaissances dans des scénarios pratiques.
  
  **Format JSON attendu :**
  [
    {
      "niveau": "facile",
      "question": "Qu'est-ce qu'une balise HTML ?"
    },
    {
      "niveau": "intermédiaire",
      "question": "Explique comment fonctionnent les cookies en JavaScript."
    },
    {
      "niveau": "avancé",
      "question": "Comment implémenteriez-vous une architecture MVC dans une application Node.js ?"
    }
  ]
  
  **Consignes :**
  - Ne donne que le JSON, sans texte explicatif.
  - Chaque question doit inclure un niveau de difficulté.
  - Les questions doivent être variées et adaptées à ${competence}.
  - Respecte strictement le format demandé.`,
  };
};

export const generateQuestion = async (theme: string) => {
  const prompt = systemControlQuestion(theme, 5);
  const answer = await continueConversation(
    { role: "user", content: "" },
    (
      await prompt
    ).content
  );
  const questions: Question[] = JSON.parse(answer.content) as Question[];

  return questions;
};

export const generateEvaluation = async (
  messages: Message,
  competence: string
) => {
  return await continueConversation(
    messages,
    (
      await responseAi(competence)
    ).content
  );
};
async function continueConversation(history: Message, initialPrompt: string) {
  console.log("call question");
  const apiKey = process.env.API_COHE;
  if (!apiKey) {
    throw new Error(
      "Cohere API key is missing. Please set the COHERE_API_KEY environment variable."
    );
  }

  const cohere = createCohere({ apiKey });
  const { text } = await generateText({
    model: cohere("command-r-plus"),
    prompt: `${initialPrompt} " reponse de l utilisateur ${history.content}"
    `,
  });
  const retour: Message = { role: "assistant", content: text };
  return retour;
}
