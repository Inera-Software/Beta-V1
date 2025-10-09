
import { DollarSign, TrendingUp, Users, Target, TrendingDown, Package, Activity, BarChart, type LucideIcon } from "lucide-react";

type ChartType = 'Area' | 'Pie' | 'Bar' | 'Line' | 'Composed' | 'Funnel' | 'Radar' | 'Scatter';

export interface Kpi {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
}

export interface ChartConfig {
    title: string;
    defaultChart: ChartType;
    data: any[];
    dataKey: string;
    nameKey: string;
    secondaryDataKey?: string;
    colSpan?: number;
}

export interface KpiDashboardData {
    title: string;
    kpis: Kpi[];
    charts: {
        [key: string]: ChartConfig;
    };
}

const emptyDashboardData: KpiDashboardData = {
    title: "Dashboard",
    kpis: [],
    charts: {}
};

export const allDashboardData: { [key: string]: KpiDashboardData } = {
    'option-1': {
        title: "Sales Performance Dashboard",
        kpis: [],
        charts: {}
    },
    'option-2': {
        title: "Marketing Campaign Analysis",
        kpis: [],
        charts: {}
    },
    'option-3': {
        title: "Inventory Management Overview",
        kpis: [],
        charts: {}
    },
};

// Generate placeholder empty data for the rest of the options
for (let i = 4; i <= 20; i++) {
    allDashboardData[`option-${i}`] = {
        title: `Dashboard View ${i}`,
        kpis: [],
        charts: {}
    };
}
