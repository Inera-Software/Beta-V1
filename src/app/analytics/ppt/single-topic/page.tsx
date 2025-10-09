
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ArrowRight,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ReactElement } from "react";

const presentationTemplates: { title: string; icon: ReactElement; description: string; href: string }[] = [];

export default function SingleTopicPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = presentationTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold tracking-tight">
          Single Topic Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a template to generate your presentation.
        </p>
      </div>
       <div className="mb-8 max-w-lg mx-auto w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
      </div>
      {presentationTemplates.length > 0 ? (
        <>
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTemplates.map((template) => (
                <Link href={template.href} key={template.title} className="flex">
                  <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 w-full">
                    {template.icon}
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold">
                        {template.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2 flex-1">
                      <CardDescription>{template.description}</CardDescription>
                    </CardContent>
                    <div className="mt-4 flex justify-end">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                No templates found for "{searchTerm}".
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No presentation templates available.</p>
        </div>
      )}
    </div>
  );
}
