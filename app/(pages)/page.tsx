"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Environment,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Shield, Sparkles } from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import { Project } from "@/generated/prisma";
import ProjectCard from "@/components/project-card";

gsap.registerPlugin(ScrollTrigger);

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        const activeProjects = data.filter(
          (project: Project) => project.status === "active"
        );
        setProjects(activeProjects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Features animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      // Projects animation
      gsap.fromTo(
        ".project-card",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              Dev<span className="text-purple-400">Projects</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/projects"
                className="text-white/80 hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            Premium
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Dev Projects
            </span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Ready-to-deploy, production-grade applications built with modern
            technologies. Save months of development time.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Browse Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-900 bg-white/80 hover:bg-white px-8 py-4 text-lg"
              >
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Our Projects?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Every project is crafted with attention to detail, scalability,
              and modern best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Code className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">
                  Fully tested, optimized, and ready for immediate deployment to
                  production environments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">High Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">
                  Optimized for speed and efficiency with modern frameworks and
                  best practices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Secure & Scalable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">
                  Built with security in mind and designed to scale with your
                  growing business needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">Modern Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">
                  Beautiful, responsive interfaces that provide excellent user
                  experience across all devices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef} className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore our most popular and comprehensive development solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              // <Card
              //   key={project.id}
              //   className="project-card bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              // >
              //   <CardHeader>
              //     <div className="flex items-center justify-between mb-2">
              //       <Badge
              //         variant="secondary"
              //         className="bg-purple-600/20 text-purple-300"
              //       >
              //         {project.category}
              //       </Badge>
              //       <span className="text-2xl font-bold text-green-400">
              //         ${project.price}
              //       </span>
              //     </div>
              //     <CardTitle className="text-white text-xl group-hover:text-purple-300 transition-colors">
              //       {project.title}
              //     </CardTitle>
              //     <CardDescription className="text-white/70">
              //       {project.description}
              //     </CardDescription>
              //   </CardHeader>
              //   <CardContent>
              //     <div className="space-y-4">
              //       <div>
              //         <p className="text-sm text-white/60 mb-1">
              //           Running Cost:
              //         </p>
              //         <p className="text-white font-semibold">
              //           ${project.runningCost}
              //         </p>
              //       </div>
              //       <div>
              //         <p className="text-sm text-white/60 mb-2">
              //           Technologies:
              //         </p>
              //         <div className="flex flex-wrap gap-2">
              //           {project.tech.map((tech) => (
              //             <Badge
              //               key={tech}
              //               variant="outline"
              //               className="border-white/20 text-white/80"
              //             >
              //               {tech}
              //             </Badge>
              //           ))}
              //         </div>
              //       </div>
              //       <Link href={`/projects/${project.id}`}>
              //         <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              //           View Details
              //           <ArrowRight className="ml-2 h-4 w-4" />
              //         </Button>
              //       </Link>
              //     </div>
              //   </CardContent>
              // </Card>
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-900 bg-white/80 hover:bg-white px-8 py-4 text-lg"
              >
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project needs or browse our
            complete catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-900 bg-white/80 hover:bg-white px-8 py-4 text-lg"
              >
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
