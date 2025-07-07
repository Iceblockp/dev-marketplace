import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, BarChart3, Users } from "lucide-react";
import type { Project } from "@/types/project";
import { Inquiry } from "@/types/inquiry";

interface StatCardsProps {
  projects: Project[];
  inquiries: Inquiry[];
}

export function StatCards({ projects, inquiries }: StatCardsProps) {
  // Calculate stats
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const totalSales = projects.reduce((sum, p) => sum + (p.sales || 0), 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const thisMonthRevenue = projects.reduce((sum, p) => {
    return sum + (p.revenue || 0) * 0.3;
  }, 0);

  const lastMonthRevenue = projects.reduce((sum, p) => {
    return sum + (p.revenue || 0) * 0.25;
  }, 0);

  const revenueGrowth =
    lastMonthRevenue > 0
      ? (
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
          100
        ).toFixed(1)
      : "0";

  const thisWeekSales = projects.reduce((sum, p) => {
    return sum + Math.floor((p.sales || 0) * 0.2);
  }, 0);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-green-400">
            +{revenueGrowth}% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Total Sales
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalSales}</div>
          <p className="text-xs text-blue-400">+{thisWeekSales} this week</p>
        </CardContent>
      </Card>

      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Active Projects
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{activeProjects}</div>
          <p className="text-xs text-purple-400">of {projects.length} total</p>
        </CardContent>
      </Card>

      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            New Inquiries
          </CardTitle>
          <Users className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{newInquiries}</div>
          <p className="text-xs text-yellow-400">Needs attention</p>
        </CardContent>
      </Card>
    </div>
  );
}
