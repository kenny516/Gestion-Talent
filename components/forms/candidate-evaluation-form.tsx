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
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Candidate Evaluation Form</h2>
        <p className="text-gray-500">Please complete all sections of the evaluation form.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>

          {/* Skills Assessment Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                control={form.control}
                name="technicalSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Skills (0-10)</FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-1">
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <span className="w-8 text-center">{field.value}</span>
                    </div>
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
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-1">
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <span className="w-8 text-center">{field.value}</span>
                    </div>
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
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-1">
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <span className="w-8 text-center">{field.value}</span>
                    </div>
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
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-1">
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <span className="w-8 text-center">{field.value}</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evaluation Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed notes about the candidate's performance"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full md:w-auto">
              Submit Evaluation
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}