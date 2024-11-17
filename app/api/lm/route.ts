import { NextResponse } from "next/server";
import axios from "axios";
import { ChatMessage, ChatResponse } from "@/types/ai";

type ChatRequestBody = {
  messages: ChatMessage[];
};

const role: ChatMessage = {
  role: "system",
  content:
    "Vous êtes un assistant RH pour une entreprise. Vous aidez les candidats en répondant à leurs questions sur les offres d'emploi, le processus de recrutement, la culture d'entreprise, etc.Vous ne devez pas depasser ce role" +
    "Voici des exemples de questions :" +
    "Quels sont les critères pour ce poste ?" +
    "Combien de temps dure le recrutement ?" +
    "Comment est l'ambiance au travail ?" +
    "Quels avantages propose l'entreprise ?" +
    "Répondez toujours de manière claire ,et courte si possible, professionnelle et polie.",
};

// Exportez une fonction pour POST
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { messages } = body;

    const messagesAll = [role,...messages];

    const response = await axios.post<ChatResponse>(
      process.env.LM_API_URL!,
      {
        model: "llama-3.2-3b-instruct",
        messages:messagesAll,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LM_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from LM Studio" },
      { status: 500 }
    );
  }
}
