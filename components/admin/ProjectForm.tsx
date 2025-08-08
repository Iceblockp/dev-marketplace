import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import type { CreateProjectData } from "@/types/project";
import { Project, ProjectStatus, Customizable } from "@/types/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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

  // Ensure galleryImages is always an array
  const galleryImages = project.galleryImages || [""];

  // Handle adding a new image URL field
  const handleAddImage = () => {
    setProject({
      ...project,
      galleryImages: [...galleryImages, ""],
    });
  };

  // Handle removing an image URL field
  const handleRemoveImage = (index: number) => {
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    setProject({
      ...project,
      galleryImages: newImages,
    });
  };

  // Handle changing an image URL
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...galleryImages];
    newImages[index] = value;
    setProject({
      ...project,
      galleryImages: newImages,
    });
  };

  // Common styling classes for dark theme
  const inputStyles = "bg-white/5 border-white/10 text-white";
  const textareaStyles = "bg-white/5 border-white/10 text-white";
  const selectTriggerStyles = "bg-white/5 border-white/10 text-white";
  const selectContentStyles = "bg-slate-800 border-white/10 text-white";

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="business">Business Details</TabsTrigger>
          <TabsTrigger value="media">Media & Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={project.title || ""}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
                className={inputStyles}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={project.category || ""}
                onValueChange={(value) =>
                  setProject({ ...project, category: value })
                }
              >
                <SelectTrigger className={selectTriggerStyles}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className={selectContentStyles}>
                  <SelectItem value="e-commerce">E-Commerce</SelectItem>
                  <SelectItem value="cms">Content Management</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                  <SelectItem value="saas">SaaS Platform</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="social-network">Social Network</SelectItem>
                  <SelectItem value="booking">Booking System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={project.shortDescription || ""}
              onChange={(e) =>
                setProject({ ...project, shortDescription: e.target.value })
              }
              className={textareaStyles}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={project.longDescription || ""}
              onChange={(e) =>
                setProject({ ...project, longDescription: e.target.value })
              }
              className={textareaStyles}
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Project Status</Label>
              <Select
                name="status"
                value={project.status || "ready"}
                onValueChange={(value) =>
                  setProject({ ...project, status: value })
                }
              >
                <SelectTrigger className={selectTriggerStyles}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className={selectContentStyles}>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customizable">Customizable</Label>
              <Select
                name="customizable"
                value={project.customizable || "partial"}
                onValueChange={(value) =>
                  setProject({ ...project, customizable: value })
                }
              >
                <SelectTrigger className={selectTriggerStyles}>
                  <SelectValue placeholder="Select customization level" />
                </SelectTrigger>
                <SelectContent className={selectContentStyles}>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (MMK)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={project.price || ""}
                onChange={(e) =>
                  setProject({ ...project, price: e.target.value })
                }
                className={inputStyles}
              />
              <p className="text-sm text-muted-foreground">
                Optional for ideas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedCustomPrice">
                Est. Custom Price (MMK)
              </Label>
              <Input
                id="estimatedCustomPrice"
                name="estimatedCustomPrice"
                type="number"
                value={project.estimatedCustomPrice || ""}
                onChange={(e) =>
                  setProject({
                    ...project,
                    estimatedCustomPrice: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Est. Duration</Label>
              <Input
                id="estimatedDuration"
                name="estimatedDuration"
                value={project.estimatedDuration || ""}
                onChange={(e) =>
                  setProject({ ...project, estimatedDuration: e.target.value })
                }
                className={inputStyles}
                placeholder="e.g., ၂ ပတ်"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAdvantages">Business Advantages</Label>
            <Textarea
              id="businessAdvantages"
              name="businessAdvantages"
              value={
                Array.isArray(project.businessAdvantages)
                  ? project.businessAdvantages.join(", ")
                  : project.businessAdvantages || ""
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  businessAdvantages: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                })
              }
              className={textareaStyles}
              placeholder="Enter advantages separated by commas"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCases">Use Cases</Label>
            <Textarea
              id="useCases"
              name="useCases"
              value={
                Array.isArray(project.useCases)
                  ? project.useCases.join(", ")
                  : project.useCases || ""
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  useCases: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                })
              }
              className={textareaStyles}
              placeholder="Enter use cases separated by commas"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={
                  Array.isArray(project.tags)
                    ? project.tags.join(", ")
                    : project.tags || ""
                }
                onChange={(e) =>
                  setProject({
                    ...project,
                    tags: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
                className={inputStyles}
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={
                  Array.isArray(project.targetAudience)
                    ? project.targetAudience.join(", ")
                    : project.targetAudience || ""
                }
                onChange={(e) =>
                  setProject({
                    ...project,
                    targetAudience: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
                className={inputStyles}
                placeholder="e.g., restaurant owners"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessTypes">Business Types</Label>
            <Input
              id="businessTypes"
              name="businessTypes"
              value={
                Array.isArray(project.businessTypes)
                  ? project.businessTypes.join(", ")
                  : project.businessTypes || ""
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  businessTypes: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                })
              }
              className={inputStyles}
              placeholder="e.g., food & beverage"
            />
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={project.coverImage || ""}
              onChange={(e) =>
                setProject({ ...project, coverImage: e.target.value })
              }
              className={inputStyles}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <div className="space-y-2">
              {galleryImages.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className={inputStyles}
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
                <Plus className="h-4 w-4 mr-2" /> Add Image URL
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoDemoUrl">Video Demo URL</Label>
            <Input
              id="videoDemoUrl"
              name="videoDemoUrl"
              value={project.videoDemoUrl || ""}
              onChange={(e) =>
                setProject({ ...project, videoDemoUrl: e.target.value })
              }
              className={inputStyles}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability"
              name="availability"
              checked={project.availability !== false}
              onCheckedChange={(checked) =>
                setProject({ ...project, availability: checked === true })
              }
            />
            <Label htmlFor="availability">Available for purchase</Label>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-white/10 text-white/70 hover:text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onSave}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isNew ? "Add Project" : "Update Project"}
        </Button>
      </div>
    </div>
  );
}
