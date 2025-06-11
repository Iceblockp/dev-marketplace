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
                    ${project.price.toLocaleString()}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-white/80 mb-8">
                  {project.longDescription || project.description}
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Running Cost</p>
                    <p className="text-white font-bold">
                      ${project.runningCost}/mo
                    </p>
                  </div>
                  <div className="text-center">
                    <Server className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Complexity</p>
                    <p className="text-white font-bold">{project.complexity}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Setup Time</p>
                    <p className="text-white font-bold">{project.setupTime}</p>
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
                  {project.demoUrl && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-gray-600  hover:text-white hover:bg-white/10 px-8"
                      onClick={() =>
                        window.open(project.demoUrl as string, "_blank")
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
                      project.images && project.images.length > 0
                        ? project.images[activeImage]
                        : "/placeholder.svg"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {project.images && project.images.length > 0 && (
                  <div className="flex gap-2">
                    {project.images.map((_, index) => (
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
                          src={project.images[index]}
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
                      What&apos;s Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.included.map((item, index) => (
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
                      Key Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Save Development Time
                      </h4>
                      <p className="text-white/70 text-sm">
                        Skip months of development with our ready-to-deploy
                        solution.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Production Ready
                      </h4>
                      <p className="text-white/70 text-sm">
                        Fully tested and optimized for production environments.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Ongoing Support
                      </h4>
                      <p className="text-white/70 text-sm">
                        30 days of setup support and documentation included.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Customizable
                      </h4>
                      <p className="text-white/70 text-sm">
                        Full source code access for complete customization.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card className="detail-card bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    Complete Feature Set
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    All the features you need for a successful project launch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium">{feature}</h4>
                        </div>
                      </div>
                    ))}
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
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.techSpecs && (
                      <>
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            Frontend
                          </h4>
                          <p className="text-white/70">
                            {project.techSpecs.frontend}
                          </p>
                        </div>
                        <Separator className="bg-white/10" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            Backend
                          </h4>
                          <p className="text-white/70">
                            {project.techSpecs.backend}
                          </p>
                        </div>
                        <Separator className="bg-white/10" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            Database
                          </h4>
                          <p className="text-white/70">
                            {project.techSpecs.database}
                          </p>
                        </div>
                        <Separator className="bg-white/10" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            Authentication
                          </h4>
                          <p className="text-white/70">
                            {project.techSpecs.authentication}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="detail-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Technologies Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-purple-600/20 text-purple-300"
                        >
                          {tech}
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
                    System Requirements
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Minimum requirements to run this project effectively
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.requirements && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">
                          Server Requirements
                        </h4>
                        <ul className="space-y-2 text-white/70">
                          <li>• {project.requirements.server}</li>
                          <li>• {project.requirements.database}</li>
                          <li>• {project.requirements.storage}</li>
                          <li>• {project.requirements.bandwidth}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-3">
                          Recommended Hosting
                        </h4>
                        <ul className="space-y-2 text-white/70">
                          <li>• Vercel (Frontend)</li>
                          <li>• Railway (Database)</li>
                          <li>• AWS/DigitalOcean (Full Stack)</li>
                          <li>• Netlify (Static Sites)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="mt-8">
              <Card className="detail-card bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    Implementation Workflow
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Step-by-step process from purchase to deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.workflow.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact to Purchase
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Browse More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
