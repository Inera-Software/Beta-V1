
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft, Download, Wrench, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SuggestionList } from "@/components/app/suggestion-list";

const suggestions: { id: string; text: string; percentage: number }[] = [];

const generatedText = ``;

export default function SalesForecastingPage() {
  const router = useRouter();

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
        <h1 className="text-3xl font-bold tracking-tight">
          Sales Forecasting
        </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-0">
               <Textarea
                  className="w-full h-[500px] resize-none border-0 focus:ring-0 text-base rounded-lg bg-transparent p-6"
                  readOnly
                  value={generatedText}
                  placeholder="Sales forecast data will be generated here."
                />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
             <Button size="lg" variant="secondary" className="w-full">
              <Video className="mr-2 h-4 w-4" />
              Generate Video
            </Button>
            <Button size="lg" variant="secondary" className="w-full">
              <Wrench className="mr-2 h-4 w-4" />
              Customize
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <SuggestionList 
            suggestions={suggestions}
            basePath="/analytics/forecasting-analyst/sales-forecasting"
          />
        </div>
      </div>
    </div>
  );
}
