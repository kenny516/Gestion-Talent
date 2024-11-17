'use server'
import { generateText } from 'ai'
import { createCohere } from '@ai-sdk/cohere'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function continueConversation(history: Message[]) {

  // Assurez-vous que la clé API est définie dans l'environnement
  const apiKey = process.env.API_COHE
  if (!apiKey) {
    throw new Error('Cohere API key is missing. Please set the COHERE_API_KEY environment variable.')
  }

  const cohere = createCohere({ apiKey }) // Utilisez directement la clé API à partir de l'environnement

  // Créez un prompt personnalisé pour guider l'IA à répondre aux questions des candidats
  const { text } = await generateText({
    model: cohere('command-r-plus'),
    prompt: `
      Vous êtes un assistant RH pour une entreprise. Vous aidez les candidats en répondant à leurs questions sur les offres d'emploi, le processus de recrutement, la culture d'entreprise, etc. 
      Voici des exemples de questions :
      - "Quels sont les critères pour ce poste ?"
      - "Combien de temps dure le recrutement ?"
      - "Comment est l'ambiance au travail ?"
      - "Quels avantages propose l'entreprise ?"
      Répondez toujours de manière claire ,et courte si possible, professionnelle et polie.
      
      L'utilisateur vous a posé la question suivante : "${history[history.length - 1]?.content}"
    `,
  })

  // Retourner l'historique mis à jour avec la réponse de l'IA
  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content: text,
      },
    ],
  }
}

