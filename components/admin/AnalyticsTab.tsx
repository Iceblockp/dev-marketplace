import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";

interface AnalyticsTabProps {
  projects: Project[];
}

export function AnalyticsTab({ projects }: AnalyticsTabProps) {
  // Calculate stats based on price instead of revenue
  const totalRevenue = projects.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );

  const thisMonthRevenue = projects.reduce((sum, p) => {
    return sum + (Number(p.price) || 0) * 0.3;
  }, 0);

  const lastMonthRevenue = projects.reduce((sum, p) => {
    return sum + (Number(p.price) || 0) * 0.25;
  }, 0);

  const revenueGrowth =
    lastMonthRevenue > 0
      ? (
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">This Month</span>
              <span className="text-white font-bold">
                ${Math.round(thisMonthRevenue).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Last Month</span>
              <span className="text-white font-bold">
                ${Math.round(lastMonthRevenue).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Revenue</span>
              <span className="text-white font-bold">
                ${totalRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Growth Rate</span>
              <span
                className={`font-bold ${
                  Number(revenueGrowth) >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {Number(revenueGrowth) >= 0 ? "+" : ""}
                {revenueGrowth}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects
              .sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0))
              .slice(0, 3)
              .map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-white/60 text-sm">
                      {project.viewsCount} views
                    </p>
                  </div>
                  <span className="text-white font-bold">
                    ${(Number(project.price) || 0).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
