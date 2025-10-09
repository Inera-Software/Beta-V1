
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Video } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { SuggestionList } from "@/components/app/suggestion-list";

const problemDetails: Record<string, { title: string; explanation: string }> = {};

const suggestions: { id: string; text: string; percentage: number }[] = [];

export default function ProblemDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const problemId = params.problemId as string;

  const details = problemDetails[problemId] || { title: "Problem not found", explanation: "No details available."};

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
       <div className="w-full max-w-6xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="w-full mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            {details.title.toUpperCase()}
          </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
            <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm h-full">
                <CardHeader>
                    <CardTitle>REASON AND EXPLANATION OF PROBLEM</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        className="w-full h-[300px] resize-none border-0 focus:ring-0 text-base bg-transparent p-0 text-muted-foreground"
                        readOnly
                        value={details.explanation}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-4">
            <SuggestionList
                suggestions={suggestions}
                basePath={`/analytics/problem-and-suggestion/problem/${problemId}`}
            />
        </div>
      </div>
        <div className="w-full max-w-6xl mx-auto mt-8 flex justify-center">
            <Button size="lg" className="h-12 text-lg font-semibold">
                <Video className="mr-2 h-5 w-5"/>
                Generate Video
            </Button>
        </div>
    </div>
  );
}
