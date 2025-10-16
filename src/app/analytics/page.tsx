
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ChevronLeft,
  FileText,
  Presentation,
  TrendingUp,
  BarChartBig,
  Lightbulb,
  ShieldCheck,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const analyticsFeatures: {
  title: string;
  icon: ReactElement;
  description: string;
  href: string;
}[] = [
  {
    title: "Document",
    description: "Generate and analyze documents.",
    href: "#",
    icon: <FileText className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "PPT",
    description: "Create presentations from your data.",
    href: "#",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "Forecasting Analyst",
    description: "Predict future trends and sales.",
    href: "#",
    icon: <TrendingUp className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "Visuals & Dashboards",
    description: "Create interactive charts.",
    href: "#",
    icon: <BarChartBig className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "Problem & Suggestion",
    description: "Get AI-powered suggestions.",
    href: "/analytics/problem-and-suggestion/details",
    icon: <Lightbulb className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "Audit Zone",
    description: "Review and audit your data.",
    href: "#",
    icon: <ShieldCheck className="h-8 w-8 mb-4 text-primary" />,
  },
  {
    title: "Collab & Share",
    description: "Collaborate and share your findings.",
    href: "#",
    icon: <Share2 className="h-8 w-8 mb-4 text-primary" />,
  },
];

export default function AnalyticsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unlock the power of your data with our suite of analytics tools.
        </p>
      </div>
      {analyticsFeatures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsFeatures.map((feature) => (
            <Link
              href={feature.href}
              key={feature.title}
              className="flex group"
            >
              <Card className="flex flex-col text-left p-4 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                {feature.icon}
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2 flex-1">
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
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
          <p className="text-lg text-muted-foreground">
            No analytics features available.
          </p>
        </div>
      )}
    </div>
  );
}
