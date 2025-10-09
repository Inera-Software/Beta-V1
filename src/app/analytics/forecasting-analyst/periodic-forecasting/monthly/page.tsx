
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const forecastData: { name: string; period: string; isPast?: boolean; isCurrent?: boolean; isClickable?: boolean; value: number; profit: number; loss: number; revenue: number }[] = [];

const COLORS = {
  profit: 'hsl(var(--chart-2))',
  loss: 'hsl(var(--chart-5))',
  revenue: 'hsl(var(--chart-1))',
};

const TEXT_COLORS = {
  profit: 'hsl(140, 100%, 80%)',
  loss: 'hsl(0, 100%, 80%)',
  revenue: 'hsl(48, 100%, 80%)',
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const colorKey = data.name.toLowerCase() as keyof typeof TEXT_COLORS;
        const color = TEXT_COLORS[colorKey] || data.payload.fill;
        return (
            <div className="p-1 bg-background/90 border border-border/50 rounded-md">
                <p className="text-xs" style={{ color }}>{`${data.name}: ${data.value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const CustomTimelineNode = ({ dataPoint }: { dataPoint: (typeof forecastData)[0] & { isClickable?: boolean } }) => {
    const pieData = [
        { name: 'Profit', value: dataPoint.profit },
        { name: 'Loss', value: dataPoint.loss },
        { name: 'Revenue', value: dataPoint.revenue },
    ];
    
    const hasData = pieData.some(d => d.value > 0);

    const nodeContent = (
        <div className="flex flex-col items-center text-center w-40">
             <div className={cn("flex flex-col items-center justify-center h-24 w-24 rounded-full border-2 relative transition-all duration-300",
                dataPoint.isCurrent ? "border-primary border-4 shadow-lg shadow-primary/20" : "border-border",
            )}>
                {hasData && (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                animationDuration={0}
                                content={<CustomTooltip />}
                                cursor={{ fill: 'hsla(var(--muted-foreground), 0.1)' }}
                            />
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell key={`cell-profit`} fill={COLORS.profit} />
                                <Cell key={`cell-loss`} fill={COLORS.loss} />
                                <Cell key={`cell-revenue`} fill={COLORS.revenue} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
             <div className={cn("mt-4 text-base font-semibold text-foreground bg-card/80 border px-4 py-2 rounded-lg shadow-sm")}>
                {`₹${dataPoint.value.toLocaleString()}`}
            </div>
            <div className="mt-2 text-center">
                <div className="text-lg font-bold text-foreground">
                    {dataPoint.name}
                </div>
                {dataPoint.isCurrent && (
                     <div className="text-sm text-muted-foreground">
                        Current
                    </div>
                )}
            </div>
        </div>
    );

    if (dataPoint.isClickable) {
        return (
            <Link href={`/analytics/forecasting-analyst/periodic-forecasting/monthly/${dataPoint.name.toLowerCase()}`}>
                {nodeContent}
            </Link>
        )
    }

    return nodeContent;
}

export default function MonthlyForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            PERIODICALLY FORECASTING
          </h1>
        </div>

        <div className="text-center mb-16">
            <div className="inline-block px-8 py-2 border rounded-lg bg-card/80 text-xl font-semibold">
                MONTHLY
            </div>
        </div>

        {forecastData.length > 0 ? (
            <>
                <div className="w-full flex justify-center items-start">
                    <div className="flex justify-between w-full max-w-5xl px-4">
                        {forecastData.map((dataPoint) => (
                            <CustomTimelineNode key={dataPoint.name} dataPoint={dataPoint} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-16 space-x-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.profit}} />
                        <span className="text-sm font-medium">Profit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.loss}} />
                        <span className="text-sm font-medium">Loss</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.revenue}} />
                        <span className="text-sm font-medium">Revenue</span>
                    </div>
                </div>
            </>
        ) : (
             <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">No monthly forecast data available.</p>
            </div>
        )}

      </div>
    </div>
  );
}
