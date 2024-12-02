"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Timer, Send, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateEvaluation, generateQuestion } from "@/app/api/ai/route";
import { api_url } from "@/types";
import axios from "axios";
import { Question, response } from "@/types/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function InterviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<response | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(api_url + "poste");
        const theme = JSON.stringify(response.data);
        setTheme(theme);

        const questionsData = await generateQuestion("preparation de gateau ");
        setQuestions(questionsData);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  /*  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 300
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion])*/

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const evaluation = await generateEvaluation(
        {
          role: "user",
          content:
            `question  ${JSON.stringify(questions[currentQuestion])} ` + answer,
        },
        theme
      );
      const response: response = JSON.parse(evaluation.content) as response;
      console.log(JSON.stringify(response));
      setAiResponse(response);

      const newScore = response.note || 0;
      setScore((prevScore) => prevScore + newScore);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setAiResponse(null);
      setTimeLeft(300);
    } else {
      router.push(`/interviews/${params.id}/results`);
    }
  };

  const averageScore = score / (currentQuestion + 1);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 max-w-5xl">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Technical Interview</h1>
          <p className="text-muted-foreground">
            Senior Frontend Developer Position
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          $
          {/*}<div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
            <Timer className="h-5 w-5 text-primary" />
            <span className="font-mono text-lg">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>${*/}
          <div className="flex items-center gap-2">
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="w-[100px]"
            />
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-primary text-primary-foreground p-2 rounded-md">
            <span className="font-mono text-lg">
              Score: {averageScore.toFixed(2)}/10
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Question</span>
              <Badge variant="outline">
                {questions[currentQuestion]?.niveau}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown className="prose dark:prose-invert max-w-none">
              {questions[currentQuestion]?.question}
            </ReactMarkdown>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Time Limit: 5 minutes
            </p>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[200px] mb-4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!aiResponse}
            />
            {aiResponse && (
              <div className="space-y-4">
                <Alert
                  variant={aiResponse.note >= 7 ? "default" : "destructive"}
                >
                  {aiResponse.note >= 7 ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>AI Evaluation</AlertTitle>
                  <AlertDescription>
                    <p className="font-semibold text-lg">
                      Score: {aiResponse.note}/10
                    </p>
                  </AlertDescription>
                </Alert>
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{aiResponse.remarques}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Answer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{aiResponse.reponse_attendue}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {!aiResponse && (
              <Button onClick={handleSubmit} disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Submit Answer
              </Button>
            )}
            {aiResponse && (
              <Button onClick={handleNextQuestion}>
                {currentQuestion === questions.length - 1
                  ? "Terminer"
                  : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
