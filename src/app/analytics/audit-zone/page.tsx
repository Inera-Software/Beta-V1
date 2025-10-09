
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const auditDetails: { title: string; content: string[] }[] = [];

export default function AuditZonePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuditDetails = auditDetails.filter((category) => {
    const term = searchTerm.toLowerCase();
    return (
      category.title.toLowerCase().includes(term) ||
      category.content.some((point) => point.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8 relative z-10">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            Compliance Dashboard
          </h1>
        </div>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
        </div>

        <Card className="bg-card/60 backdrop-blur-sm p-6">
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This dashboard displays customized updates and guidelines for your
              company. The content is tailored to your organization's specific
              compliance needs.
            </p>

            <Accordion type="single" collapsible className="w-full" defaultValue={filteredAuditDetails.length > 0 ? filteredAuditDetails[0].title : undefined}>
              {filteredAuditDetails.map((category) => (
                <AccordionItem
                  key={category.title}
                  value={category.title}
                >
                  <AccordionTrigger className="text-2xl font-semibold text-primary hover:no-underline">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 list-disc pl-5 py-2">
                      {category.content.map((point, index) => (
                        <li
                          key={index}
                          className="text-base font-normal text-muted-foreground"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             {auditDetails.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">No audit details available.</p>
                </div>
            )}
             {auditDetails.length > 0 && filteredAuditDetails.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">No results found for "{searchTerm}".</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
