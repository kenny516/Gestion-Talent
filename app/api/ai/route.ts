"use server"
import { generateText } from "ai";
import { createCohere } from "@ai-sdk/cohere";
import { Message, Question } from "@/types/ai";
import { console } from "inspector";


const systemController: Message = {
  role: "system",
  content: `Tu es un expert en [insère le domaine ici, par exemple : "développement logiciel", "ressources humaines", "gestion de projet"].

    Ton rôle est d'évaluer les réponses du candidat en fonction de leur clarté, de leur pertinence et de leur niveau de détail.

    Pour chaque question posée par le candidat, tu dois fournir une évaluation structurée sous la forme d'un JSON avec le format suivant :
    {
    "note": [une note sur 10],
    "remarques": "[une explication concise pour justifier la note donnée, y compris les points forts ou faibles de la réponse du candidat]",
    "reponse_attendue": "[une réponse exemple ou un guide pour ce qu'une bonne réponse aurait dû contenir]"
    }
    Rappelle-toi :
    - Sois juste et précis dans ton évaluation.
    - Donne des remarques constructives pour aider le candidat à s'améliorer.
    - Adapte tes évaluations au niveau d'expertise attendu du candidat (par exemple, débutant, intermédiaire, ou avancé).

    Exemple de question et d'évaluation :
    - **Question** : "Qu'est-ce qu'une API REST ?"
    - **Réponse du candidat** : "C'est une interface permettant aux systèmes de communiquer."
    - **Évaluation en JSON** :
    {
    "note": 7,
    "remarques": "La réponse est correcte mais trop vague. Une API REST est une interface qui utilise des principes spécifiques comme les méthodes HTTP (GET, POST, PUT, DELETE) et suit des conventions comme l'utilisation de ressources via des URLs.",
    "reponse_attendue": "Une API REST est une interface permettant aux systèmes de communiquer en utilisant les méthodes HTTP et des conventions spécifiques. Elle repose sur des principes tels que statelessness, les ressources et les réponses en format JSON ou XML."
    }

    Maintenant, analyse la réponse du candidat en utilisant ce format.
    `,
};
export const systemControlQuestion = async (competence: string,Nbquestion: number) => {
  return {
    role: "system",
    content: `
        Tu es un expert en ${competence} et tu dois générer ${Nbquestion} questions techniques adaptées à ce domaine.
        Ces questions doivent être de différents niveaux de difficulté (facile, intermédiaire, avancé) et couvrir une variété de sujets clés associés à cette compétence.
        Les questions doivent être conçues pour évaluer la compréhension du candidat, sa capacité à résoudre des problèmes complexes et à appliquer ses connaissances dans des scénarios pratiques.

        La compétence à couvrir est : ${competence}.

        Génère un tableau JSON de questions en suivant ce format par example:
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

        Le nombre de questions à générer est ${Nbquestion}.
        Les questions doivent couvrir des aspects clés de la compétence ${competence}, et chaque question doit inclure le niveau de difficulté (facile, intermédiaire ou avancé).
        important  donne juste le json n ajoute aucune phrase ne formule pass donne juste les donne ..
      `,
  };
};



export const generateQuestion = async (theme: string) => {
  const prompt = systemControlQuestion(theme, 5);
  const answer = await continueConversation(
    { role: "user", content: "" },
    (await prompt).content
  );
  const questions: Question[] = JSON.parse(answer.content) as Question[];

  return questions;
};

export const generateEvaluation =async (messages: Message) => {
  return await continueConversation(messages, systemController.content);
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
