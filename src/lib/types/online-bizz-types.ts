export interface Platform {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: "available" | "connected" | "in_progress" | "error";
  category: string;
  features: string[];
  connectionDate?: string;
  lastSync?: string;
  stats?: {
    orders: number;
    revenue: number;
    products: number;
    customers: number;
  };
  difficulty: "Easy" | "Medium" | "Advanced";
  setupTime: string;
}

export interface ConnectedAccount {
  id: string;
  platformId: string;
  platformName: string;
  accountName: string;
  accountId: string;
  status: "active" | "in_progress" | "error" | "pending_verification";
  stats: {
    today: { revenue: number; orders: number; customers: number };
    last7days: { revenue: number; orders: number; customers: number };
    last1month: { revenue: number; orders: number; customers: number };
    alltime: { revenue: number; orders: number; customers: number };
  };
  lastActivity: string;
  profileImage: string;
}

export type TimeRange = "today" | "last7days" | "last1month" | "alltime";

export const timeRangeLabels = {
  today: "Today",
  last7days: "Last 7 Days",
  last1month: "Last Month",
  alltime: "All Time",
};