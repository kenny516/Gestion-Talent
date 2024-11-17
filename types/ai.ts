export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
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
