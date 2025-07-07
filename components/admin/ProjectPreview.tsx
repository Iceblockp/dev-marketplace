import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

interface ProjectPreviewProps {
  project: Project;
  onClose: () => void;
}

export function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Preview: {project.title}</DialogTitle>
          <DialogDescription className="text-white/70">
            Complete project information and details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Basic Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-white/60">Title:</span>{" "}
                  <span className="text-white">{project.title}</span>
                </p>
                <p>
                  <span className="text-white/60">Category:</span>{" "}
                  <span className="text-white">{project.category}</span>
                </p>
                <p>
                  <span className="text-white/60">Price:</span>{" "}
                  <span className="text-white">
                    ${project.price?.toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="text-white/60">Running Cost:</span>{" "}
                  <span className="text-white">
                    ${project.runningCost}/month
                  </span>
                </p>
                <p>
                  <span className="text-white/60">Complexity:</span>{" "}
                  <span className="text-white">{project.complexity}</span>
                </p>
                <p>
                  <span className="text-white/60">Setup Time:</span>{" "}
                  <span className="text-white">{project.setupTime}</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Status & Metrics
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-white/60">Status:</span>{" "}
                  <Badge
                    className={
                      project.status === "active"
                        ? "bg-green-600/20 text-green-300"
                        : "bg-yellow-600/20 text-yellow-300"
                    }
                  >
                    {project.status}
                  </Badge>
                </p>
                <p>
                  <span className="text-white/60">Sales:</span>{" "}
                  <span className="text-white">{project.sales || 0}</span>
                </p>
                <p>
                  <span className="text-white/60">Revenue:</span>{" "}
                  <span className="text-white">
                    ${(project.revenue || 0).toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="text-white/60">Created:</span>{" "}
                  <span className="text-white">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <span className="text-white/60">Updated:</span>{" "}
                  <span className="text-white">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-white font-semibold mb-2">Description</h3>
            <p className="text-white/80 text-sm">{project.description}</p>
          </div>

          {/* Long Description */}
          {project.longDescription && (
            <div>
              <h3 className="text-white font-semibold mb-2">
                Detailed Description
              </h3>
              <p className="text-white/80 text-sm">{project.longDescription}</p>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h3 className="text-white font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <Badge
                  key={index}
                  className="bg-purple-600/20 text-purple-300 text-xs"
                >
                  {tech.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-2">Features</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <p className="text-white/80 text-sm">{feature.trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          {project.techSpecs && (
            <div>
              <h3 className="text-white font-semibold mb-2">
                Technical Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Frontend:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.frontend}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Backend:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.backend}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Database:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.database}
                    </span>
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Authentication:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.authentication}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Payments:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.payments}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Deployment:</span>{" "}
                    <span className="text-white">
                      {project.techSpecs.deployment}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* System Requirements */}
          {project.requirements && (
            <div>
              <h3 className="text-white font-semibold mb-2">
                System Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Server:</span>{" "}
                    <span className="text-white">
                      {project.requirements.server}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Database:</span>{" "}
                    <span className="text-white">
                      {project.requirements.database}
                    </span>
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Storage:</span>{" "}
                    <span className="text-white">
                      {project.requirements.storage}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Bandwidth:</span>{" "}
                    <span className="text-white">
                      {project.requirements.bandwidth}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* What's Included */}
          <div>
            <h3 className="text-white font-semibold mb-2">
              What&apos;s Included
            </h3>
            <div className="space-y-2">
              {project.included.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5"></div>
                  <p className="text-white/80 text-sm">{item.trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Workflow */}
          <div>
            <h3 className="text-white font-semibold mb-2">
              Implementation Workflow
            </h3>
            <div className="space-y-2">
              {project.workflow.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                    {index + 1}
                  </div>
                  <p className="text-white/80 text-sm">{step.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
