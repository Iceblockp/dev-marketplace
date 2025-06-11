"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  MessageCircle,
  Book,
  Video,
  Download,
  Clock,
  Search,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    project: "",
    priority: "",
    subject: "",
    description: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".support-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "How do I get started with a purchased project?",
      answer:
        "After purchase, you'll receive a complete package including source code, database schemas, setup instructions, and documentation. Follow the step-by-step setup guide included with your project.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We provide 30 days of free setup support, including help with deployment, configuration, and basic customization. This includes email support and documentation access.",
    },
    {
      question: "Can I customize the projects?",
      answer:
        "You receive the complete source code and can modify everything to match your requirements. We also provide documentation to help you understand the codebase.",
    },
    {
      question: "What technologies are used in the projects?",
      answer:
        "Our projects use modern technologies like React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, and more. Each project listing includes the complete tech stack.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day money-back guarantee if the project doesn't meet your expectations. Please contact our support team to initiate a refund request.",
    },
    {
      question: "How long does deployment take?",
      answer:
        "Most projects can be deployed within 1-3 days depending on complexity. We provide detailed deployment guides and can assist with the process during your support period.",
    },
    {
      question: "Do you provide hosting recommendations?",
      answer:
        "Yes! We recommend hosting platforms like Vercel, Netlify, Railway, and AWS based on your project type. Our documentation includes deployment guides for popular platforms.",
    },
    {
      question: "Can I get custom development services?",
      answer:
        "Yes, we offer custom development services for clients who need modifications beyond the standard projects. Contact us to discuss your specific requirements and get a quote.",
    },
  ];

  const resources = [
    {
      title: "Setup Guides",
      description: "Step-by-step instructions for deploying your projects",
      icon: Book,
      link: "#",
      badge: "Essential",
    },
    {
      title: "Video Tutorials",
      description:
        "Watch detailed walkthroughs of project setup and customization",
      icon: Video,
      link: "#",
      badge: "Popular",
    },
    {
      title: "Documentation",
      description: "Complete technical documentation for all projects",
      icon: FileText,
      link: "#",
      badge: "Comprehensive",
    },
    {
      title: "Code Examples",
      description: "Additional code snippets and implementation examples",
      icon: Download,
      link: "#",
      badge: "Helpful",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log("Ticket submitted:", ticketForm);
    // Reset form or show success message
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Support{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Center
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Get help with your projects, find answers to common questions, and
              access comprehensive documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
              >
                <Book className="mr-2 h-5 w-5" />
                Browse Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quick Help
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find the help you need quickly with our organized support
              resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="support-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <HelpCircle className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">FAQ</CardTitle>
                <CardDescription className="text-white/70">
                  Common questions and answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Browse FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="support-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Live Chat</CardTitle>
                <CardDescription className="text-white/70">
                  Get instant help from our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="support-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Email Support</CardTitle>
                <CardDescription className="text-white/70">
                  Send us a detailed message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="support-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Phone Support</CardTitle>
                <CardDescription className="text-white/70">
                  Call us for urgent issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Resources
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Access comprehensive guides, tutorials, and documentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="support-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <resource.icon className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                    <Badge
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300"
                    >
                      {resource.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{resource.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find answers to the most common questions about our projects and
              services
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/5 border-white/10 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No results found
                </h3>
                <p className="text-white/60">
                  Try adjusting your search terms or browse all FAQs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Ticket Form */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="support-card bg-white/5 border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">
                  Submit a Support Ticket
                </CardTitle>
                <CardDescription className="text-white/70">
                  Can&apos;t find what you&apos;re looking for? Send us a
                  detailed message and we&apos;ll help you out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={ticketForm.name}
                        onChange={(e) =>
                          setTicketForm({ ...ticketForm, name: e.target.value })
                        }
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            email: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project" className="text-white">
                        Related Project
                      </Label>
                      <Select
                        value={ticketForm.project}
                        onValueChange={(value) =>
                          setTicketForm({ ...ticketForm, project: value })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">
                            E-Commerce Platform
                          </SelectItem>
                          <SelectItem value="dashboard">
                            SaaS Dashboard
                          </SelectItem>
                          <SelectItem value="backend">
                            Mobile App Backend
                          </SelectItem>
                          <SelectItem value="crm">CRM System</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-white">
                        Priority
                      </Label>
                      <Select
                        value={ticketForm.priority}
                        onValueChange={(value) =>
                          setTicketForm({ ...ticketForm, priority: value })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          subject: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          description: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
                      placeholder="Please provide as much detail as possible about your issue..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Support Hours
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="text-center">
                  <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Email Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70">24/7 Response</p>
                  <p className="text-white font-semibold">Within 4 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70">Mon-Fri</p>
                  <p className="text-white font-semibold">9AM - 6PM EST</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="text-center">
                  <Phone className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Phone Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70">Mon-Fri</p>
                  <p className="text-white font-semibold">10AM - 5PM EST</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
