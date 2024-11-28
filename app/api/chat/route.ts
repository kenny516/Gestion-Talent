"use server";
import { generateText } from "ai";
import { createCohere } from "@ai-sdk/cohere";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(
  history: Message[],
  complement: string
) {
  console.log(complement);
  // Assurez-vous que la clé API est définie dans l'environnement
  const apiKey = process.env.API_COHE;
  if (!apiKey) {
    throw new Error(
      "Cohere API key is missing. Please set the COHERE_API_KEY environment variable."
    );
  }

  const cohere = createCohere({ apiKey }); // Utilisez directement la clé API à partir de l'environnement

  // Créez un prompt personnalisé pour guider l'IA à répondre aux questions des candidats
  const { text } = await generateText({
    model: cohere("command-r-plus"),
    prompt: `
      Vous êtes un assistant RH pour une entreprise. Votre rôle est de répondre aux questions des candidats concernant les offres d'emploi, le processus de recrutement, la culture de l'entreprise, les avantages sociaux, et d'autres aspects relatifs à l'environnement de travail. Vous devez répondre de manière claire, concise, professionnelle et courtoise. Voici des exemples de questions que vous pourriez recevoir :

      - "Quels sont les critères requis pour ce poste ?"
      - "Quel est le processus de recrutement et combien de temps cela prend-il ?"
      - "Pouvez-vous me parler de l'ambiance de travail dans l'entreprise ?"
      - "Quels avantages l'entreprise offre-t-elle à ses employés ?"

      Vous devez toujours répondre avec des informations précises, pertinentes et en restant dans le cadre de votre rôle d'assistant RH. Utilisez les informations suivantes sur l'utilisateur, si elles sont pertinentes, pour personnaliser votre réponse : ${complement}.

      L'utilisateur a posé la question suivante : "${
        history[history.length - 1]?.content
      }"
    `,
  });

  // Retourner l'historique mis à jour avec la réponse de l'IA
  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content: text,
      },
    ],
  };
}
