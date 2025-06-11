"use client";

import { useEffect, useRef } from "react";
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
import {
  Code2,
  Rocket,
  Shield,
  Users,
  Award,
  Clock,
  Star,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Projects Delivered", value: "150+", icon: Rocket },
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Years Experience", value: "8+", icon: Award },
    { label: "Support Hours", value: "24/7", icon: Clock },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Lead Developer & Founder",
      bio: "Full-stack developer with 10+ years experience in React, Node.js, and cloud architecture.",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      bio: "Creative designer focused on user experience and modern interface design.",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Mike Rodriguez",
      role: "Backend Specialist",
      bio: "Database and API expert with expertise in scalable backend solutions.",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["PostgreSQL", "Redis", "Docker", "Microservices"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "Every project is thoroughly tested and optimized for production use.",
      icon: Shield,
    },
    {
      title: "Modern Technology",
      description:
        "We use the latest frameworks and best practices in all our projects.",
      icon: Code2,
    },
    {
      title: "Customer Success",
      description:
        "Your success is our priority. We provide ongoing support and guidance.",
      icon: Users,
    },
    {
      title: "Fast Delivery",
      description:
        "Get your projects up and running quickly with our streamlined process.",
      icon: Rocket,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                DevProjects
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              We&apos;re a team of passionate developers and designers dedicated
              to creating premium, production-ready applications that help
              businesses succeed in the digital world. Our mission is to save
              you months of development time while delivering exceptional
              quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                >
                  View Our Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10 px-8"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client
              satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="stat-card bg-white/5 border-white/10 text-center"
              >
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-white/70">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <CardHeader>
                  <value.icon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section ref={teamRef} className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The talented individuals behind DevProjects
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="team-card bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <CardDescription className="text-purple-300 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70 text-sm">{member.bio}</p>

                  <div>
                    <p className="text-white/60 text-xs mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-white/20 text-white/80 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={member.social.github}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              How we ensure every project meets the highest standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-white font-semibold mb-2">
                Planning & Design
              </h3>
              <p className="text-white/70 text-sm">
                We start with thorough planning and create detailed designs and
                specifications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-white font-semibold mb-2">Development</h3>
              <p className="text-white/70 text-sm">
                Our experienced developers build the project using modern
                technologies and best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-white font-semibold mb-2">Testing & QA</h3>
              <p className="text-white/70 text-sm">
                Rigorous testing ensures everything works perfectly before
                delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-white font-semibold mb-2">
                Delivery & Support
              </h3>
              <p className="text-white/70 text-sm">
                We deliver the complete project with documentation and provide
                ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Real feedback from satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  &apos;The e-commerce platform saved us 6 months of development
                  time. The code quality is exceptional and the support is
                  outstanding.&apos;
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">John Smith</p>
                    <p className="text-white/60 text-sm">CEO, TechStart Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  &apos;Professional, reliable, and delivered exactly what we
                  needed. The dashboard solution exceeded our
                  expectations.&apos;
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-white/60 text-sm">CTO, DataFlow</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  &apos;Great communication, fast delivery, and excellent
                  documentation. Will definitely work with them again.&apos;
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">Mike Chen</p>
                    <p className="text-white/60 text-sm">Founder, AppVenture</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project needs and find the perfect solution
            for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Start Your Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
