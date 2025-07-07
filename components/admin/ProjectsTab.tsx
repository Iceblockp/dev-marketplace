import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project, CreateProjectData } from "@/types/project";
import { ProjectForm } from "./ProjectForm";
import { ProjectsTable } from "./ProjectsTable";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectsTabProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export function ProjectsTab({ projects, setProjects }: ProjectsTabProps) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<CreateProjectData>({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    runningCost: "",
    category: "",
    tech: "",
    features: "",
    complexity: "Intermediate",
    setupTime: "1-2 days",
    status: "draft",
    demoUrl: "",
    sales: "",
    revenue: "",
    images: [""],
    techSpecs: {
      frontend: "",
      backend: "",
      database: "",
      authentication: "",
      payments: "",
      deployment: "",
    },
    requirements: {
      server: "",
      database: "",
      storage: "",
      bandwidth: "",
    },
    included: "",
    workflow: "",
  });

  const handleAddProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const project = await response.json();
        setProjects([...projects, project]);
        setNewProject({
          title: "",
          description: "",
          longDescription: "",
          price: "",
          runningCost: "",
          category: "",
          tech: "",
          features: "",
          complexity: "Intermediate",
          setupTime: "1-2 days",
          status: "draft",
          demoUrl: "",
          sales: "",
          revenue: "",
          images: [""],
          techSpecs: {
            frontend: "",
            backend: "",
            database: "",
            authentication: "",
            payments: "",
            deployment: "",
          },
          requirements: {
            server: "",
            database: "",
            storage: "",
            bandwidth: "",
          },
          included: "",
          workflow: "",
        });
        setIsAddingProject(false);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({
      ...project,
      tech: Array.isArray(project.tech)
        ? project.tech.join(", ")
        : project.tech,
      features: Array.isArray(project.features)
        ? project.features.join(", ")
        : project.features,
      included: Array.isArray(project.included)
        ? project.included.join(", ")
        : project.included,
      workflow: Array.isArray(project.workflow)
        ? project.workflow.join(", ")
        : project.workflow,
      price: project.price.toString(),
      runningCost: project.runningCost.toString(),
      sales: project.sales.toString(),
      revenue: project.revenue.toString(),
      techSpecs: project.techSpecs || {
        frontend: "",
        backend: "",
        database: "",
        authentication: "",
        payments: "",
        deployment: "",
      },
      requirements: project.requirements || {
        server: "",
        database: "",
        storage: "",
        bandwidth: "",
      },
    });
  };

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(
          projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Projects Management</CardTitle>
              <CardDescription className="text-white/70">
                Manage your project catalog and track performance
              </CardDescription>
            </div>
            <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Create a new project for your catalog
                  </DialogDescription>
                </DialogHeader>
                <ProjectForm
                  project={newProject}
                  setProject={setNewProject}
                  onSave={handleAddProject}
                  onCancel={() => setIsAddingProject(false)}
                  isNew={true}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Table */}
          <ProjectsTable
            projects={filteredProjects}
            onPreview={setPreviewProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        </CardContent>
      </Card>

      {/* Edit Project Dialog */}
      {editingProject && (
        <Dialog
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
        >
          <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription className="text-white/70">
                Update project information
              </DialogDescription>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              setProject={setEditingProject}
              onSave={handleUpdateProject}
              onCancel={() => setEditingProject(null)}
              isNew={false}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Project Preview Dialog */}
      {previewProject && (
        <ProjectPreview
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </>
  );
}
