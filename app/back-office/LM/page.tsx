'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Sun, Moon, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { ChatMessage } from "@/types/ai"


export default function Component() {
  const [messages, setMessages] = useState<ChatMessage[]>([
  ])
  const [input, setInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    // Nouveau message utilisateur
    const userMessage: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    // Mise à jour locale avant l'envoi
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Requête à l'API
      const response = await axios.post<{
        choices: { message: ChatMessage }[];
      }>("/api/lm", { messages: updatedMessages });

      // Message de l'assistant
      const assistantMessage: ChatMessage = response.data.choices[0].message;

      // Mise à jour des messages avec la réponse
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const clearChat = () => {
    setMessages([{ role: "system", content: "You are a helpful assistant." }])
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${darkMode ? 'dark' : ''}`}>
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">AI Chat Assistant</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={clearChat}
              className="rounded-full"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear chat</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[60vh] overflow-y-auto pr-4 space-y-4">
            <AnimatePresence>
              {messages
                .filter((msg) => msg.role !== "system")
                .map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`flex items-end space-x-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className={msg.role === "user" ? "bg-blue-500" : "bg-gray-500"}>
                        <AvatarFallback>{msg.role === "user" ? "U" : "AI"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
            {loading && (
              <div className="flex items-center space-x-2">
                <Avatar className="bg-gray-500">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </motion.div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center w-full space-x-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}