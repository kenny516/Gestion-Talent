"use client"
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { continueConversation, Message } from "@/app/api/chat/route";
import { motion, AnimatePresence } from "framer-motion";

export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation, loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage: Message = { role: "user", content: input.trim() };
    setConversation((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const { messages } = await continueConversation([
        ...conversation,
        newMessage,
      ]);
      setConversation(messages);
    } catch (error) {
      // Handle error appropriately
      console.error("Error lors de la recuperation de la reponse AI:", error);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Desole, Une erreur s'est produite. Veuillez reessayer." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
    const isUser = message.role === "user";
    return (
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`
          mb-4 p-4 rounded-2xl max-w-[80%] 
          ${isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}
          shadow-sm hover:shadow-md transition-shadow
          ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}
        `}
      >
        <div className={`flex items-center gap-2 mb-1 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-sm font-medium opacity-75">
            {isUser ? "You" : "AI"}
          </span>
        </div>
        <p className="break-words text-sm leading-relaxed">{message.content}</p>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex items-center justify-center from-background to-muted p-4 rounded-md">
      <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary">
        <CardHeader className="bg-card border-b">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Assistant Ai
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[500px] pr-4" ref={scrollAreaRef}>
            <AnimatePresence>
              {conversation.map((message, index) => (
                <MessageBubble key={index} message={message} index={index} />
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center space-x-2 p-4"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-card border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full space-x-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-grow bg-background focus:ring-2 focus:ring-primary/50"
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}