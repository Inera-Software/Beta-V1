
"use client";

import { useState } from "react";
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
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ReactElement } from "react";

const dashboardItems: { id: string; label: string; description: string; icon: ReactElement, href: string }[] = [];

export default function VisualsAndDashboardsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDashboards = dashboardItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-4xl font-bold tracking-tight">
          Visuals & Dashboards
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a dashboard type to get started.
        </p>
      </div>

      <div className="mb-8 max-w-lg mx-auto w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search dashboards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
      </div>

      {dashboardItems.length > 0 ? (
        <>
          {filteredDashboards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDashboards.map((item) => (
                <Link href={item.href} key={item.id} className="flex group">
                  <Card className="flex flex-col text-left p-3 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                    {item.icon}
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold">{item.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-1 flex-1">
                      <p className="text-sm text-muted-foreground">
                        {item.description}
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
              <p className="text-lg text-muted-foreground">
                No dashboards found for "{searchTerm}".
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No dashboards available.</p>
        </div>
      )}
      <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-md font-semibold h-12"
            onClick={() => router.push('/analytics/visuals-and-dashboards/custom')}
          >
            CUSTOM VISUALS & DASHBOARD
          </Button>
      </div>
    </div>
  );
}
