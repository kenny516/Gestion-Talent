export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Question = {
  niveau: string;
  question: string;
};

export type response = {
  note: number;
  remarques: string;
  reponse_attendue: string;
};

export type ChatRequestBody = {
  messages: ChatMessage[];
};

export type ChatResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
