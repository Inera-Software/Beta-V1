
import { NextResponse } from 'next/server';

const problems = [
  {
    id: "declining-sales",
    title: "Declining Sales",
    description: "Overall sales have dropped by 15% in the last quarter.",
    icon: "TrendingDown",
    confidence: 92,
  },
  {
    id: "supply-chain",
    title: "Supply Chain Bottleneck",
    description: "Delays in raw material delivery are impacting production timelines.",
    icon: "Factory",
    confidence: 88,
  },
  {
    id: "customer-churn",
    title: "High Customer Churn",
    description: "Customer retention rates have fallen below the industry average.",
    icon: "AlertTriangle",
    confidence: 75,
  },
];

export async function GET() {
  // In a real application, you would fetch this data from a database
  // or another service.
  return NextResponse.json(problems);
}
