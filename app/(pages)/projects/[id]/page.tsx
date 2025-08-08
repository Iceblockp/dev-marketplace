"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  CheckCircle,
  ExternalLink,
  DollarSign,
  Clock,
  Zap,
  Server,
  ArrowLeft,
  MessageCircle,
  Play,
  Code,
} from "lucide-react";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".detail-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [project]);

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link href="/projects">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 px-6">
        <div className="container mx-auto">
          <div className="hero-content">
            <Link
              href="/projects"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300"
                  >
                    {project.category}
                  </Badge>
                  <Badge className="bg-green-600/80 text-white">
                    ${Number(project.price).toLocaleString()}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-white/80 mb-8">
                  {project.shortDescription}
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Est. Price</p>
                    <p className="text-white font-bold">
                      $
                      {Number(
                        project.estimatedCustomPrice || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <Server className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Customizable</p>
                    <p className="text-white font-bold">
                      {project.customizable}
                    </p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Est. Duration</p>
                    <p className="text-white font-bold">
                      {project.estimatedDuration || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact to Purchase
                    </Button>
                  </Link>
                  {project.videoDemoUrl && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8"
                      onClick={() =>
                        window.open(project.videoDemoUrl as string, "_blank")
                      }
                    >
                      <Play className="mr-2 h-5 w-5" />
                      View Demo
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10">
                  <img
                    src={
                      project.galleryImages && project.galleryImages.length > 0
                        ? project.galleryImages[activeImage]
                        : project.coverImage || "/placeholder.svg"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="flex gap-2">
                    {project.galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-20 h-12 rounded border-2 overflow-hidden ${
                          activeImage === index
                            ? "border-purple-400"
                            : "border-white/20"
                        }`}
                      >
                        <img
                          src={project.galleryImages[index]}
                          alt={`${project.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section ref={contentRef} className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-purple-600"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="data-[state=active]:bg-purple-600"
              >
                Tech Stack
              </TabsTrigger>
              <TabsTrigger
                value="requirements"
                className="data-[state=active]:bg-purple-600"
              >
                Requirements
              </TabsTrigger>
              <TabsTrigger
                value="workflow"
                className="data-[state=active]:bg-purple-600"
              >
                Workflow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="detail-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                      Business Advantages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.businessAdvantages.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-white/80"
                        >
                          <CheckCircle className="mr-3 h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="detail-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                      Use Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.useCases.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-white/80"
                        >
                          <CheckCircle className="mr-3 h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card className="detail-card bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    Target Audience & Business Types
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Who this project is designed for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">
                        Target Audience
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.targetAudience.map((audience) => (
                          <Badge
                            key={audience}
                            className="bg-purple-600/20 text-purple-300"
                          >
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">
                        Business Types
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.businessTypes.map((type) => (
                          <Badge
                            key={type}
                            className="bg-blue-600/20 text-blue-300"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tech" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="detail-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Code className="mr-2 h-5 w-5 text-blue-400" />
                      Long Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 whitespace-pre-line">
                      {project.longDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card className="detail-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-purple-600/20 text-purple-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-8">
              <Card className="detail-card bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Server className="mr-2 h-5 w-5 text-orange-400" />
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Additional information about this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Project Status
                      </h4>
                      <Badge className="bg-green-600/20 text-green-300">
                        {project.status}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Customizable
                      </h4>
                      <Badge className="bg-blue-600/20 text-blue-300">
                        {project.customizable}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Base Price
                      </h4>
                      <p className="text-white/70">
                        ${Number(project.price).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Estimated Custom Price
                      </h4>
                      <p className="text-white/70">
                        $
                        {Number(
                          project.estimatedCustomPrice || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Estimated Duration
                      </h4>
                      <p className="text-white/70">
                        {project.estimatedDuration || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">Created</h4>
                      <p className="text-white/70">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="mt-8">
              <Card className="detail-card bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Gallery</CardTitle>
                  <CardDescription className="text-white/70">
                    Visual showcase of the project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.galleryImages && project.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video rounded overflow-hidden bg-white/5 border border-white/10"
                          onClick={() => setActiveImage(index)}
                        >
                          <img
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/60">No gallery images available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Contact us to purchase this project and receive complete source
            code, documentation, and setup support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
