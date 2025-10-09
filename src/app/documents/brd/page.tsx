
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Download, Video, Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrdPage() {
  const router = useRouter();

  const generatedText = ``;

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full max-w-4xl mb-8 text-center mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">
          Business Requirement Document
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and take action on your generated BRD.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-6 mx-auto">
        <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <Textarea
              className="w-full h-[500px] resize-none border-0 focus:ring-0 text-base rounded-lg bg-transparent p-6"
              readOnly
              value={generatedText}
              placeholder="BRD content will be generated here."
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button size="lg" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download BRD
          </Button>
          <Button size="lg" className="w-full" variant="secondary">
            <Video className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
          <Button size="lg" variant="secondary" className="w-full">
            <Wrench className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
}
