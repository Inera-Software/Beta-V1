
import { NextResponse } from 'next/server';

// In a real application, this data would come from a database,
// another service, or an AI model.
const problems = [
  {
    id: "decreasing-sales",
    title: "Decreasing Sales",
    description: "Overall sales revenue has declined by 15% in the last quarter.",
    icon: "TrendingDown",
    confidence: 92,
  },
  {
    id: "low-customer-retention",
    title: "Low Customer Retention",
    description: "Customer churn rate has increased, with fewer repeat purchases.",
    icon: "AlertTriangle",
    confidence: 88,
  },
  {
    id: "inefficient-marketing",
    title: "Inefficient Marketing",
    description: "Marketing spend is high, but lead conversion rates are below industry average.",
    icon: "Lightbulb",
    confidence: 75,
  },
];

export async function GET() {
  // You can add authentication and data fetching logic here.
  // For now, we'll just return the static data with a delay to simulate a network request.
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(problems);
}
