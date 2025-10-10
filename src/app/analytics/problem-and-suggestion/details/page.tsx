
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ArrowRight,
  Video,
  AlertTriangle,
  Factory,
  TrendingDown as TrendingDownIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactElement, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Problem {
  id: string;
  title: string;
  description: string;
  icon: string;
  confidence: number;
}

const iconMap: { [key: string]: ReactElement } = {
  TrendingDown: <TrendingDownIcon className="h-8 w-8 mb-4 text-primary" />,
  AlertTriangle: <AlertTriangle className="h-8 w-8 mb-4 text-primary" />,
  Factory: <Factory className="h-8 w-8 mb-4 text-primary" />,
};

const getConfidenceColor = (score: number) => {
  if (score >= 85) return "text-red-400"; // High confidence -> light red
  if (score >= 60) return "text-yellow-400"; // Medium confidence -> yellow
  return "text-green-400"; // Low confidence -> green
};

export default function ProblemSuggestionDetailsPage() {
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await fetch('/api/problems');
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error(error);
        // Handle error state in UI if necessary
      } finally {
        setIsLoading(false);
      }
    }
    fetchProblems();
  }, []);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
          PROBLEM & SUGGESTION
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Select a problem to see AI-powered analysis and actionable suggestions.
        </p>
      </div>

      {isLoading ? (
         <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="flex flex-col p-4 w-full bg-card/60 backdrop-blur-sm">
                <Skeleton className="h-8 w-8 mb-4" />
                <CardHeader className="p-0">
                   <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="p-0 mt-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
                <div className="mt-4 flex justify-end">
                   <Skeleton className="h-4 w-4" />
                </div>
              </Card>
            ))}
        </div>
      ) : problems.length > 0 ? (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Link
              href={`/analytics/problem-and-suggestion/problem/${problem.id}`}
              key={problem.id}
              className="flex group"
            >
              <Card className="relative flex flex-col text-left p-4 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-2 right-2 px-2 py-1 bg-background/50 rounded-md text-xs font-bold">
                    <span className={getConfidenceColor(problem.confidence)}>
                        {problem.confidence}%
                    </span>
                </div>
                {iconMap[problem.icon] || <AlertTriangle className="h-8 w-8 mb-4 text-primary" />}
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {problem.description}
                  </p>
                </CardContent>
                <div className="mt-4 flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No problems identified at the moment.</p>
        </div>
      )}
      <div className="w-full max-w-6xl mx-auto mt-12 flex justify-center gap-4">
        <Button size="lg" className="h-12 text-lg font-semibold">
            <Video className="mr-2 h-5 w-5"/>
            Generate Video
        </Button>
      </div>
    </div>
  );
}
