
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const presentationTypes: { title: string; icon: ReactElement; description: string; href: string }[] = [];

export default function PptPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Presentations</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a presentation type to get started.
        </p>
      </div>
      {presentationTypes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presentationTypes.map((type) => (
            <Link href={type.href} key={type.title} className="flex group">
              <Card className="flex flex-col text-left p-3 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                {type.icon}
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold">
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-1 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {type.description}
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
          <p className="text-lg text-muted-foreground">No presentation types available.</p>
        </div>
      )}
    </div>
  );
}
