"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Timer, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateEvaluation, generateQuestion } from "@/app/api/ai/route";
import { api_url } from "@/types";
import axios from "axios";
import { Question } from "@/types/ai";

export default function InterviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(api_url + "poste");
      const theme = JSON.stringify(response.data);
      console.log(theme);
      const questionsData = await generateQuestion(theme);
      console.log(questionsData);
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleSubmit = async () => {
    const evaluation = await generateEvaluation({
      role: "user",
      content: `question  numero ${currentQuestion} `+answer,
    });
    

    generateEvaluation(evaluation);

    const mockScore = 0;
    setScore((prevScore) => prevScore + mockScore);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setTimeLeft(300);
    } else {
      // Interview completed
      router.push(`/interviews/${params.id}/results`);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Technical Interview</h1>
          <p className="text-muted-foreground">
            Senior Frontend Developer Position
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span>
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="w-[100px]"
          />
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Difficulty: {questions[currentQuestion]?.niveau}
                </span>
                <span className="text-sm text-muted-foreground">
                  Time Limit: 5 minutes
                </span>
              </div>
              <ReactMarkdown className="prose dark:prose-invert">
                {questions[currentQuestion]?.question}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your answer here..."
                className="min-h-[200px]"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmit}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Answer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
