import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectsTableProps {
  projects: Project[];
  onPreview: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export function ProjectsTable({
  projects,
  onPreview,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left text-white/70 pb-3">Project</th>
            <th className="text-left text-white/70 pb-3">Category</th>
            <th className="text-left text-white/70 pb-3">Price</th>
            <th className="text-left text-white/70 pb-3">Customizable</th>
            <th className="text-left text-white/70 pb-3">Status</th>
            <th className="text-left text-white/70 pb-3">Views</th>
            <th className="text-left text-white/70 pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-white/5">
              <td className="py-4">
                <div>
                  <p className="text-white font-medium">{project.title}</p>
                  <p className="text-white/60 text-sm">
                    {project.shortDescription}
                  </p>
                </div>
              </td>
              <td className="py-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-600/20 text-purple-300"
                >
                  {project.category}
                </Badge>
              </td>
              <td className="py-4 text-white">
                ${project.price?.toLocaleString()}
              </td>
              <td className="py-4 text-white">
                <Badge
                  className={
                    project.customizable === "yes"
                      ? "bg-green-600/20 text-green-300"
                      : project.customizable === "no"
                      ? "bg-red-600/20 text-red-300"
                      : "bg-yellow-600/20 text-yellow-300"
                  }
                >
                  {project.customizable}
                </Badge>
              </td>
              <td className="py-4">
                <Badge
                  className={
                    project.status === "ready"
                      ? "bg-green-600/20 text-green-300"
                      : "bg-yellow-600/20 text-yellow-300"
                  }
                >
                  {project.status}
                </Badge>
              </td>
              <td className="py-4 text-white">{project.viewsCount}</td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPreview(project)}
                    className="border-gray-200 text-gray-600 hover:text-white/80 hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(project)}
                    className="border-gray-200 text-gray-600 hover:text-white/80 hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(project.id)}
                    className="border-red-400/20 text-red-400 hover:text-white hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
