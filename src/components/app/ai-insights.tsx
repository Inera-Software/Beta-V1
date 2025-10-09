
"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AiInsightsProps {
  data: string;
}

export function AiInsights({ data }: AiInsightsProps) {
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    toast({
      variant: "destructive",
      title: "AI Feature Disabled",
      description: "Genkit has been removed from this application.",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          AI-Powered Insights
          <Wand2 className="h-6 w-6 text-primary" />
        </CardTitle>
        <CardDescription>
          Click to analyze your data and reveal key trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleGenerateInsights}
            className="w-full"
            variant="primary"
          >
            Generate Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
