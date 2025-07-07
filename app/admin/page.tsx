"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle,
} from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/hooks/use-auth";
import type { Project, CreateProjectData } from "@/types/project";
import { Inquiry } from "@/types/inquiry";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { StatCards } from "@/components/admin/StatCards";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { InquiriesTab } from "@/components/admin/InquiriesTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
    fetchInquiries();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <AdminNavbar />

        <div className="pt-20 p-6" ref={dashboardRef}>
          <div className="container mx-auto">
            {/* Header */}
            <DashboardHeader />

            <StatCards projects={projects} inquiries={inquiries} />

            {/* Main Content */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-purple-600"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="inquiries"
                  className="data-[state=active]:bg-purple-600"
                >
                  Inquiries
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-purple-600"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-6">
                <ProjectsTab projects={projects} setProjects={setProjects} />
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries" className="mt-6">
                <InquiriesTab
                  inquiries={inquiries}
                  setInquiries={setInquiries}
                />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <AnalyticsTab projects={projects} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
