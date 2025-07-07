import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import type { CreateProjectData } from "@/types/project";

interface ProjectFormProps {
  project: CreateProjectData;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}

export function ProjectForm({
  project,
  setProject,
  onSave,
  onCancel,
  isNew,
}: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const handleAddImage = () => {
    setProject({
      ...project,
      images: [...(project.images || []), ""],
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...(project.images || [])];
    newImages.splice(index, 1);
    setProject({
      ...project,
      images: newImages,
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(project.images || [])];
    newImages[index] = value;
    setProject({
      ...project,
      images: newImages,
    });
  };

  return (
    <div className="space-y-6">
      {/* Form Tabs */}
      <div className="flex border-b border-white/10">
        <button
          className={`px-4 py-2 ${
            activeTab === "basic"
              ? "border-b-2 border-purple-500 text-white"
              : "text-white/60"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Information
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "pricing"
              ? "border-b-2 border-purple-500 text-white"
              : "text-white/60"
          }`}
          onClick={() => setActiveTab("pricing")}
        >
          Pricing & Details
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "tech"
              ? "border-b-2 border-purple-500 text-white"
              : "text-white/60"
          }`}
          onClick={() => setActiveTab("tech")}
        >
          Technical Specifications
        </button>
      </div>

      {/* Basic Information */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="bg-white/5 border-white/10"
              placeholder="E-commerce Platform"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={project.category}
              onValueChange={(value) =>
                setProject({ ...project, category: value })
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="e-commerce">E-commerce</SelectItem>
                <SelectItem value="cms">CMS</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Project Images</Label>
            <div className="space-y-2">
              {(project.images || []).map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="bg-white/5 border-white/10"
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveImage(index)}
                    className="border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddImage}
                className="border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="bg-white/5 border-white/10"
              placeholder="A brief description of your project"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Detailed Description</Label>
            <Textarea
              id="longDescription"
              value={project.longDescription || ""}
              onChange={(e) =>
                setProject({ ...project, longDescription: e.target.value })
              }
              className="bg-white/5 border-white/10"
              placeholder="A detailed description of your project"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              value={project.demoUrl || ""}
              onChange={(e) =>
                setProject({ ...project, demoUrl: e.target.value })
              }
              className="bg-white/5 border-white/10"
              placeholder="https://demo.example.com"
            />
          </div>
        </div>
      )}

      {/* Pricing & Details */}
      {activeTab === "pricing" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={project.price}
                onChange={(e) =>
                  setProject({ ...project, price: e.target.value })
                }
                className="bg-white/5 border-white/10"
                placeholder="99.99"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="runningCost">Monthly Running Cost ($)</Label>
              <Input
                id="runningCost"
                type="number"
                value={project.runningCost}
                onChange={(e) =>
                  setProject({ ...project, runningCost: e.target.value })
                }
                className="bg-white/5 border-white/10"
                placeholder="9.99"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity</Label>
              <Select
                value={project.complexity}
                onValueChange={(value) =>
                  setProject({ ...project, complexity: value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="setupTime">Setup Time</Label>
              <Select
                value={project.setupTime}
                onValueChange={(value) =>
                  setProject({ ...project, setupTime: value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select setup time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1 hour">Less than 1 hour</SelectItem>
                  <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                  <SelectItem value="1-2 days">1-2 days</SelectItem>
                  <SelectItem value="3-5 days">3-5 days</SelectItem>
                  <SelectItem value="1+ week">1+ week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={project.status}
              onValueChange={(value) =>
                setProject({ ...project, status: value })
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech">Technologies (comma separated)</Label>
            <Textarea
              id="tech"
              value={project.tech}
              onChange={(e) => setProject({ ...project, tech: e.target.value })}
              className="bg-white/5 border-white/10"
              placeholder="React, Next.js, Tailwind CSS"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              value={project.features}
              onChange={(e) =>
                setProject({ ...project, features: e.target.value })
              }
              className="bg-white/5 border-white/10"
              placeholder="User authentication, Admin dashboard, Payment processing"
              rows={2}
            />
          </div>

          {!isNew && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sales">Sales</Label>
                <Input
                  id="sales"
                  type="number"
                  value={project.sales}
                  onChange={(e) =>
                    setProject({ ...project, sales: e.target.value })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={project.revenue}
                  onChange={(e) =>
                    setProject({ ...project, revenue: e.target.value })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Technical Specifications */}
      {activeTab === "tech" && (
        <div className="space-y-6">
          {/* Technical Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frontend">Frontend</Label>
                <Input
                  id="frontend"
                  value={project.techSpecs?.frontend || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        frontend: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="React, Next.js"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backend">Backend</Label>
                <Input
                  id="backend"
                  value={project.techSpecs?.backend || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        backend: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="Node.js, Express"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="database">Database</Label>
                <Input
                  id="database"
                  value={project.techSpecs?.database || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        database: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="PostgreSQL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authentication">Authentication</Label>
                <Input
                  id="authentication"
                  value={project.techSpecs?.authentication || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        authentication: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="NextAuth.js"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payments">Payments</Label>
                <Input
                  id="payments"
                  value={project.techSpecs?.payments || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        payments: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="Stripe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deployment">Deployment</Label>
                <Input
                  id="deployment"
                  value={project.techSpecs?.deployment || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techSpecs: {
                        ...project.techSpecs!,
                        deployment: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="Vercel, Railway, or AWS"
                />
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              System Requirements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server">Server Requirements</Label>
                <Input
                  id="server"
                  value={project.requirements?.server || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      requirements: {
                        ...project.requirements!,
                        server: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="2GB RAM, 1 CPU Core minimum"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reqDatabase">Database Requirements</Label>
                <Input
                  id="reqDatabase"
                  value={project.requirements?.database || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      requirements: {
                        ...project.requirements!,
                        database: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="PostgreSQL 12+"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storage">Storage Requirements</Label>
                <Input
                  id="storage"
                  value={project.requirements?.storage || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      requirements: {
                        ...project.requirements!,
                        storage: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="10GB minimum"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bandwidth">Bandwidth Requirements</Label>
                <Input
                  id="bandwidth"
                  value={project.requirements?.bandwidth || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      requirements: {
                        ...project.requirements!,
                        bandwidth: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                  placeholder="Unlimited recommended"
                />
              </div>
            </div>
          </div>

          {/* What's Included & Workflow */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              Package Details
            </h3>
            <div className="space-y-2">
              <Label htmlFor="included">
                What&apos;s Included (comma separated)
              </Label>
              <Textarea
                id="included"
                value={project.included}
                onChange={(e) =>
                  setProject({
                    ...project,
                    included: e.target.value,
                  })
                }
                className="bg-white/5 border-white/10"
                placeholder="Complete source code, Database schema and migrations, Admin dashboard, User authentication system"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workflow">
                Implementation Workflow (comma separated)
              </Label>
              <Textarea
                id="workflow"
                value={project.workflow}
                onChange={(e) =>
                  setProject({
                    ...project,
                    workflow: e.target.value,
                  })
                }
                className="bg-white/5 border-white/10"
                placeholder="Purchase and receive source code, Set up development environment, Configure database and environment variables"
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isNew ? "Add Project" : "Update Project"}
        </Button>
      </div>
    </div>
  );
}
