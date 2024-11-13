"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const formSchema = z.object({
  candidateName: z.string().min(2, {
    message: "Candidate name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position is required.",
  }),
  technicalSkills: z.number().min(0).max(10),
  communication: z.number().min(0).max(10),
  problemSolving: z.number().min(0).max(10),
  culturalFit: z.number().min(0).max(10),
  notes: z.string().min(10, {
    message: "Notes must be at least 10 characters.",
  }),
});

export function CandidateEvaluationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: "",
      position: "",
      technicalSkills: 5,
      communication: 5,
      problemSolving: 5,
      culturalFit: 5,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Evaluation submitted successfully!");
    console.log(values);
  }

  return (
    <Card className="p-6 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 w-1/3"
        >
          <FormField
            control={form.control}
            name="candidateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Candidate Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Applied For</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technicalSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Skills (0-10)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Skills (0-10)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="problemSolving"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem Solving (0-10)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="culturalFit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cultural Fit (0-10)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evaluation Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detailed notes about the candidate's performance"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center">
            <Button variant="default" type="submit">
              Submit Evaluation
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
