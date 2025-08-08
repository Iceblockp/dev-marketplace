import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface ProjectPreviewProps {
  project: Project;
  onClose: () => void;
}

export function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Preview</DialogTitle>
          <DialogDescription>
            Preview how the project will appear to users
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{project.category}</Badge>
              {project.price ? (
                <Badge variant="default">
                  ${project.price.toLocaleString()}
                </Badge>
              ) : (
                <Badge variant="secondary">Idea Stage</Badge>
              )}
            </div>

            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-muted-foreground">{project.shortDescription}</p>
          </div>

          {/* Cover Image */}
          {project.coverImage && (
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Business Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Status</h4>
                    <p className="text-sm">
                      {project.status === "ready"
                        ? "Ready to Deploy"
                        : "Idea Stage"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Customizable</h4>
                    <p className="text-sm">
                      {project.customizable === "yes"
                        ? "Yes"
                        : project.customizable === "no"
                        ? "No"
                        : "Partially"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {project.price && (
                    <div>
                      <h4 className="text-sm font-medium">Base Price</h4>
                      <p className="text-sm">
                        {project.price.toLocaleString()} MMK
                      </p>
                    </div>
                  )}
                  {project.estimatedCustomPrice && (
                    <div>
                      <h4 className="text-sm font-medium">Est. Custom Price</h4>
                      <p className="text-sm">
                        {project.estimatedCustomPrice.toLocaleString()} MMK
                      </p>
                    </div>
                  )}
                </div>

                {project.estimatedDuration && (
                  <div>
                    <h4 className="text-sm font-medium">Estimated Duration</h4>
                    <p className="text-sm">{project.estimatedDuration}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium">Created</h4>
                  <p className="text-sm">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Target Market</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.targetAudience &&
                  project.targetAudience.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium">Target Audience</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.targetAudience.map((audience) => (
                          <Badge key={audience} variant="outline">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {project.businessTypes && project.businessTypes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium">Business Types</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.businessTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium">Tags</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-slate-800 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{project.longDescription}</p>
              </div>
            </CardContent>
          </Card>

          {/* Business Advantages */}
          {project.businessAdvantages &&
            project.businessAdvantages.length > 0 && (
              <Card className="bg-slate-800 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Business Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {project.businessAdvantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

          {/* Use Cases */}
          {project.useCases && project.useCases.length > 0 && (
            <Card className="bg-slate-800 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <Card className="bg-slate-800 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-md overflow-hidden bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Demo */}
          {project.videoDemoUrl && (
            <Card className="bg-slate-800 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Video Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <iframe
                    src={project.videoDemoUrl}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10 text-white hover:bg-white/10"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
