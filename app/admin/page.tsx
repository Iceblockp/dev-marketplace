// "use client";

// import { useState, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   BarChart3,
//   Users,
//   DollarSign,
//   TrendingUp,
//   Search,
//   CheckCircle,
// } from "lucide-react";
// import { AuthGuard } from "@/components/auth-guard";
// import { useAuth } from "@/hooks/use-auth";

// export default function AdminDashboard() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [inquiries, setInquiries] = useState<any[]>([]);
//   const [isAddingProject, setIsAddingProject] = useState(false);
//   const [editingProject, setEditingProject] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [previewProject, setPreviewProject] = useState<any>(null);
//   const [replyingTo, setReplyingTo] = useState<any>(null);
//   const [replyMessage, setReplyMessage] = useState("");

//   const dashboardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchProjects();
//     fetchInquiries();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch("/api/projects");
//       if (response.ok) {
//         const data = await response.json();
//         setProjects(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch projects:", error);
//     }
//   };

//   const fetchInquiries = async () => {
//     try {
//       const response = await fetch("/api/inquiries");
//       if (response.ok) {
//         const data = await response.json();
//         setInquiries(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch inquiries:", error);
//     }
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".dashboard-card",
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: "power3.out",
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   const [newProject, setNewProject] = useState({
//     title: "",
//     description: "",
//     longDescription: "",
//     price: "",
//     runningCost: "",
//     category: "",
//     tech: "",
//     features: "",
//     complexity: "Intermediate",
//     setupTime: "1-2 days",
//     status: "draft",
//     demoUrl: "",
//     sales: "",
//     revenue: "",
//     techSpecs: {
//       frontend: "",
//       backend: "",
//       database: "",
//       authentication: "",
//       payments: "",
//       deployment: "",
//     },
//     requirements: {
//       server: "",
//       database: "",
//       storage: "",
//       bandwidth: "",
//     },
//     included: "",
//     workflow: "",
//   });

//   const handleAddProject = async () => {
//     try {
//       const response = await fetch("/api/projects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProject),
//       });

//       if (response.ok) {
//         const project = await response.json();
//         setProjects([...projects, project]);
//         setNewProject({
//           title: "",
//           description: "",
//           longDescription: "",
//           price: "",
//           runningCost: "",
//           category: "",
//           tech: "",
//           features: "",
//           complexity: "Intermediate",
//           setupTime: "1-2 days",
//           status: "draft",
//           demoUrl: "",
//           sales: "",
//           revenue: "",
//           techSpecs: {
//             frontend: "",
//             backend: "",
//             database: "",
//             authentication: "",
//             payments: "",
//             deployment: "",
//           },
//           requirements: {
//             server: "",
//             database: "",
//             storage: "",
//             bandwidth: "",
//           },
//           included: "",
//           workflow: "",
//         });
//         setIsAddingProject(false);
//       }
//     } catch (error) {
//       console.error("Failed to create project:", error);
//     }
//   };

//   const handleEditProject = (project: any) => {
//     setEditingProject({
//       ...project,
//       tech: Array.isArray(project.tech)
//         ? project.tech.join(", ")
//         : project.tech,
//       features: Array.isArray(project.features)
//         ? project.features.join(", ")
//         : project.features,
//       included: Array.isArray(project.included)
//         ? project.included.join(", ")
//         : project.included,
//       workflow: Array.isArray(project.workflow)
//         ? project.workflow.join(", ")
//         : project.workflow,
//       price: project.price.toString(),
//       runningCost: project.runningCost.toString(),
//       sales: project.sales.toString(),
//       revenue: project.revenue.toString(),
//     });
//   };

//   const handleUpdateProject = async () => {
//     try {
//       const response = await fetch(`/api/projects/${editingProject.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editingProject),
//       });

//       if (response.ok) {
//         const updatedProject = await response.json();
//         setProjects(
//           projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
//         );
//         setEditingProject(null);
//       }
//     } catch (error) {
//       console.error("Failed to update project:", error);
//     }
//   };

//   const handleDeleteProject = async (id: number) => {
//     try {
//       const response = await fetch(`/api/projects/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setProjects(projects.filter((p) => p.id !== id));
//       }
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//     }
//   };

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || project.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate stats
//   const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);
//   const totalSales = projects.reduce((sum, p) => sum + (p.sales || 0), 0);
//   const activeProjects = projects.filter((p) => p.status === "active").length;
//   const newInquiries = inquiries.filter((i) => i.status === "new").length;

//   const thisMonthRevenue = projects.reduce((sum, p) => {
//     return sum + (p.revenue || 0) * 0.3;
//   }, 0);

//   const lastMonthRevenue = projects.reduce((sum, p) => {
//     return sum + (p.revenue || 0) * 0.25;
//   }, 0);

//   const revenueGrowth =
//     lastMonthRevenue > 0
//       ? (
//           ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
//           100
//         ).toFixed(1)
//       : "0";

//   const thisWeekSales = projects.reduce((sum, p) => {
//     return sum + Math.floor((p.sales || 0) * 0.2);
//   }, 0);

//   const handleReplyToInquiry = (inquiry: any) => {
//     setReplyingTo(inquiry);
//     setReplyMessage(
//       `Hi ${inquiry.name},\n\nThank you for your interest in ${inquiry.projectType}. `
//     );
//   };

//   const handleSendReply = () => {
//     console.log("Sending reply to:", replyingTo.email);
//     console.log("Message:", replyMessage);

//     setInquiries(
//       inquiries.map((inq) =>
//         inq.id === replyingTo.id
//           ? {
//               ...inq,
//               status: "contacted",
//               lastContact: new Date().toISOString().split("T")[0],
//             }
//           : inq
//       )
//     );

//     setReplyingTo(null);
//     setReplyMessage("");
//   };

//   const handleUpdateInquiryStatus = (inquiryId: number, newStatus: string) => {
//     setInquiries(
//       inquiries.map((inq) =>
//         inq.id === inquiryId
//           ? {
//               ...inq,
//               status: newStatus,
//               lastContact: new Date().toISOString().split("T")[0],
//             }
//           : inq
//       )
//     );
//   };

//   const { logout } = useAuth();

//   return (
//     <AuthGuard>
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         {/* Navigation */}
//         <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
//           <div className="container mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <Link href="/" className="text-2xl font-bold text-white">
//                 Dev<span className="text-purple-400">Projects</span>{" "}
//                 <span className="text-sm text-purple-300">Admin</span>
//               </Link>
//               <div className="flex items-center space-x-4">
//                 <Link href="/">
//                   <Button variant="outline" className="">
//                     View Site
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="outline"
//                   className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
//                   onClick={logout}
//                 >
//                   Logout
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <div className="pt-20 p-6" ref={dashboardRef}>
//           <div className="container mx-auto">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold text-white mb-2">
//                 Admin Dashboard
//               </h1>
//               <p className="text-white/70">
//                 Manage your projects, track sales, and handle customer inquiries
//               </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <Card className="dashboard-card bg-white/5 border-white/10">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-white/70">
//                     Total Revenue
//                   </CardTitle>
//                   <DollarSign className="h-4 w-4 text-green-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">
//                     ${totalRevenue.toLocaleString()}
//                   </div>
//                   <p className="text-xs text-green-400">
//                     +{revenueGrowth}% from last month
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card className="dashboard-card bg-white/5 border-white/10">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-white/70">
//                     Total Sales
//                   </CardTitle>
//                   <TrendingUp className="h-4 w-4 text-blue-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">
//                     {totalSales}
//                   </div>
//                   <p className="text-xs text-blue-400">
//                     +{thisWeekSales} this week
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card className="dashboard-card bg-white/5 border-white/10">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-white/70">
//                     Active Projects
//                   </CardTitle>
//                   <BarChart3 className="h-4 w-4 text-purple-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">
//                     {activeProjects}
//                   </div>
//                   <p className="text-xs text-purple-400">
//                     of {projects.length} total
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card className="dashboard-card bg-white/5 border-white/10">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium text-white/70">
//                     New Inquiries
//                   </CardTitle>
//                   <Users className="h-4 w-4 text-yellow-400" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-white">
//                     {newInquiries}
//                   </div>
//                   <p className="text-xs text-yellow-400">Needs attention</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Main Content */}
//             <Tabs defaultValue="projects" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
//                 <TabsTrigger
//                   value="projects"
//                   className="data-[state=active]:bg-purple-600"
//                 >
//                   Projects
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="inquiries"
//                   className="data-[state=active]:bg-purple-600"
//                 >
//                   Inquiries
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="analytics"
//                   className="data-[state=active]:bg-purple-600"
//                 >
//                   Analytics
//                 </TabsTrigger>
//               </TabsList>

//               {/* Projects Tab */}
//               <TabsContent value="projects" className="mt-6">
//                 <Card className="dashboard-card bg-white/5 border-white/10">
//                   <CardHeader>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <CardTitle className="text-white">
//                           Projects Management
//                         </CardTitle>
//                         <CardDescription className="text-white/70">
//                           Manage your project catalog and track performance
//                         </CardDescription>
//                       </div>
//                       <Dialog
//                         open={isAddingProject}
//                         onOpenChange={setIsAddingProject}
//                       >
//                         <DialogTrigger asChild>
//                           <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
//                             <Plus className="mr-2 h-4 w-4" />
//                             Add Project
//                           </Button>
//                         </DialogTrigger>

//                         <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
//                           <DialogHeader>
//                             <DialogTitle>Add New Project</DialogTitle>
//                             <DialogDescription className="text-white/70">
//                               Create a new project for your catalog
//                             </DialogDescription>
//                           </DialogHeader>
//                           <div className="grid gap-6 py-4">
//                             {/* Basic Information */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 Basic Information
//                               </h3>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="title">Project Title *</Label>
//                                   <Input
//                                     id="title"
//                                     value={newProject.title}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         title: e.target.value,
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="E-Commerce Platform"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="category">Category *</Label>
//                                   <Select
//                                     value={newProject.category}
//                                     onValueChange={(value) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         category: value,
//                                       })
//                                     }
//                                   >
//                                     <SelectTrigger className="bg-white/5 border-white/10">
//                                       <SelectValue placeholder="Select category" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="E-Commerce">
//                                         E-Commerce
//                                       </SelectItem>
//                                       <SelectItem value="Dashboard">
//                                         Dashboard
//                                       </SelectItem>
//                                       <SelectItem value="Backend">
//                                         Backend
//                                       </SelectItem>
//                                       <SelectItem value="CRM">CRM</SelectItem>
//                                       <SelectItem value="Education">
//                                         Education
//                                       </SelectItem>
//                                       <SelectItem value="Social">
//                                         Social
//                                       </SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </div>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="description">
//                                   Short Description *
//                                 </Label>
//                                 <Input
//                                   id="description"
//                                   value={newProject.description}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       description: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="Complete e-commerce solution with inventory management"
//                                 />
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="longDescription">
//                                   Detailed Description
//                                 </Label>
//                                 <Textarea
//                                   id="longDescription"
//                                   value={newProject.longDescription}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       longDescription: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   rows={4}
//                                   placeholder="A comprehensive e-commerce platform built with modern technologies..."
//                                 />
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="demoUrl">Demo URL</Label>
//                                 <Input
//                                   id="demoUrl"
//                                   value={newProject.demoUrl}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       demoUrl: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="https://demo.example.com"
//                                 />
//                               </div>
//                             </div>

//                             {/* Pricing & Details */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 Pricing & Details
//                               </h3>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="price">Price ($) *</Label>
//                                   <Input
//                                     id="price"
//                                     type="number"
//                                     value={newProject.price}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         price: e.target.value,
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="2999"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="runningCost">
//                                     Running Cost ($/month) *
//                                   </Label>
//                                   <Input
//                                     id="runningCost"
//                                     type="number"
//                                     value={newProject.runningCost}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         runningCost: e.target.value,
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="50"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="sales">Sales Count</Label>
//                                   <Input
//                                     id="sales"
//                                     type="number"
//                                     value={newProject.sales}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         sales: e.target.value,
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="0"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="revenue">
//                                     Total Revenue ($)
//                                   </Label>
//                                   <Input
//                                     id="revenue"
//                                     type="number"
//                                     value={newProject.revenue}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         revenue: e.target.value,
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="0"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="complexity">
//                                     Complexity *
//                                   </Label>
//                                   <Select
//                                     value={newProject.complexity}
//                                     onValueChange={(value) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         complexity: value,
//                                       })
//                                     }
//                                   >
//                                     <SelectTrigger className="bg-white/5 border-white/10">
//                                       <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="Beginner">
//                                         Beginner
//                                       </SelectItem>
//                                       <SelectItem value="Intermediate">
//                                         Intermediate
//                                       </SelectItem>
//                                       <SelectItem value="Advanced">
//                                         Advanced
//                                       </SelectItem>
//                                       <SelectItem value="Expert">
//                                         Expert
//                                       </SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="setupTime">
//                                     Setup Time *
//                                   </Label>
//                                   <Select
//                                     value={newProject.setupTime}
//                                     onValueChange={(value) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         setupTime: value,
//                                       })
//                                     }
//                                   >
//                                     <SelectTrigger className="bg-white/5 border-white/10">
//                                       <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="1 day">
//                                         1 day
//                                       </SelectItem>
//                                       <SelectItem value="1-2 days">
//                                         1-2 days
//                                       </SelectItem>
//                                       <SelectItem value="2-3 days">
//                                         2-3 days
//                                       </SelectItem>
//                                       <SelectItem value="3-4 days">
//                                         3-4 days
//                                       </SelectItem>
//                                       <SelectItem value="4-5 days">
//                                         4-5 days
//                                       </SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </div>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="status">Status *</Label>
//                                 <Select
//                                   value={newProject.status}
//                                   onValueChange={(value) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       status: value,
//                                     })
//                                   }
//                                 >
//                                   <SelectTrigger className="bg-white/5 border-white/10">
//                                     <SelectValue />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="draft">Draft</SelectItem>
//                                     <SelectItem value="active">
//                                       Active
//                                     </SelectItem>
//                                     <SelectItem value="archived">
//                                       Archived
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                             </div>

//                             {/* Technologies & Features */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 Technologies & Features
//                               </h3>
//                               <div className="space-y-2">
//                                 <Label htmlFor="tech">
//                                   Technologies (comma separated) *
//                                 </Label>
//                                 <Input
//                                   id="tech"
//                                   value={newProject.tech}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       tech: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="Next.js, Stripe, PostgreSQL, Tailwind CSS, Prisma, NextAuth"
//                                 />
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="features">
//                                   Features (comma separated) *
//                                 </Label>
//                                 <Textarea
//                                   id="features"
//                                   value={newProject.features}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       features: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="Payment Integration with Stripe, Inventory Management System, Admin Dashboard, Mobile Responsive Design"
//                                   rows={3}
//                                 />
//                               </div>
//                             </div>

//                             {/* Technical Specifications */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 Technical Specifications
//                               </h3>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="frontend">Frontend</Label>
//                                   <Input
//                                     id="frontend"
//                                     value={newProject.techSpecs.frontend}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           frontend: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="Next.js 15, React 18, Tailwind CSS"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="backend">Backend</Label>
//                                   <Input
//                                     id="backend"
//                                     value={newProject.techSpecs.backend}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           backend: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="Next.js API Routes, Prisma ORM"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="database">Database</Label>
//                                   <Input
//                                     id="database"
//                                     value={newProject.techSpecs.database}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           database: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="PostgreSQL"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="authentication">
//                                     Authentication
//                                   </Label>
//                                   <Input
//                                     id="authentication"
//                                     value={newProject.techSpecs.authentication}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           authentication: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="NextAuth.js"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="payments">Payments</Label>
//                                   <Input
//                                     id="payments"
//                                     value={newProject.techSpecs.payments}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           payments: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="Stripe"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="deployment">Deployment</Label>
//                                   <Input
//                                     id="deployment"
//                                     value={newProject.techSpecs.deployment}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         techSpecs: {
//                                           ...newProject.techSpecs,
//                                           deployment: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="Vercel, Railway, or AWS"
//                                   />
//                                 </div>
//                               </div>
//                             </div>

//                             {/* System Requirements */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 System Requirements
//                               </h3>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="server">
//                                     Server Requirements
//                                   </Label>
//                                   <Input
//                                     id="server"
//                                     value={newProject.requirements.server}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         requirements: {
//                                           ...newProject.requirements,
//                                           server: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="2GB RAM, 1 CPU Core minimum"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="reqDatabase">
//                                     Database Requirements
//                                   </Label>
//                                   <Input
//                                     id="reqDatabase"
//                                     value={newProject.requirements.database}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         requirements: {
//                                           ...newProject.requirements,
//                                           database: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="PostgreSQL 12+"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label htmlFor="storage">
//                                     Storage Requirements
//                                   </Label>
//                                   <Input
//                                     id="storage"
//                                     value={newProject.requirements.storage}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         requirements: {
//                                           ...newProject.requirements,
//                                           storage: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="10GB minimum"
//                                   />
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label htmlFor="bandwidth">
//                                     Bandwidth Requirements
//                                   </Label>
//                                   <Input
//                                     id="bandwidth"
//                                     value={newProject.requirements.bandwidth}
//                                     onChange={(e) =>
//                                       setNewProject({
//                                         ...newProject,
//                                         requirements: {
//                                           ...newProject.requirements,
//                                           bandwidth: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="bg-white/5 border-white/10"
//                                     placeholder="Unlimited recommended"
//                                   />
//                                 </div>
//                               </div>
//                             </div>

//                             {/* What's Included & Workflow */}
//                             <div className="space-y-4">
//                               <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                                 Package Details
//                               </h3>
//                               <div className="space-y-2">
//                                 <Label htmlFor="included">
//                                   What's Included (comma separated)
//                                 </Label>
//                                 <Textarea
//                                   id="included"
//                                   value={newProject.included}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       included: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="Complete source code, Database schema and migrations, Admin dashboard, User authentication system"
//                                   rows={3}
//                                 />
//                               </div>

//                               <div className="space-y-2">
//                                 <Label htmlFor="workflow">
//                                   Implementation Workflow (comma separated)
//                                 </Label>
//                                 <Textarea
//                                   id="workflow"
//                                   value={newProject.workflow}
//                                   onChange={(e) =>
//                                     setNewProject({
//                                       ...newProject,
//                                       workflow: e.target.value,
//                                     })
//                                   }
//                                   className="bg-white/5 border-white/10"
//                                   placeholder="Purchase and receive source code, Set up development environment, Configure database and environment variables"
//                                   rows={3}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex justify-end gap-2">
//                             <Button
//                               variant="outline"
//                               onClick={() => setIsAddingProject(false)}
//                               className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
//                             >
//                               Cancel
//                             </Button>
//                             <Button
//                               onClick={handleAddProject}
//                               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                             >
//                               Add Project
//                             </Button>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {/* Filters */}
//                     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                       <div className="relative flex-1">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
//                         <Input
//                           placeholder="Search projects..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
//                         />
//                       </div>
//                       <Select
//                         value={statusFilter}
//                         onValueChange={setStatusFilter}
//                       >
//                         <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
//                           <SelectValue placeholder="Filter by status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All Status</SelectItem>
//                           <SelectItem value="active">Active</SelectItem>
//                           <SelectItem value="draft">Draft</SelectItem>
//                           <SelectItem value="archived">Archived</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Projects Table */}
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead>
//                           <tr className="border-b border-white/10">
//                             <th className="text-left text-white/70 pb-3">
//                               Project
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Category
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Price
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Sales
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Revenue
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Status
//                             </th>
//                             <th className="text-left text-white/70 pb-3">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {filteredProjects.map((project) => (
//                             <tr
//                               key={project.id}
//                               className="border-b border-white/5"
//                             >
//                               <td className="py-4">
//                                 <div>
//                                   <p className="text-white font-medium">
//                                     {project.title}
//                                   </p>
//                                   <p className="text-white/60 text-sm">
//                                     {project.description}
//                                   </p>
//                                 </div>
//                               </td>
//                               <td className="py-4">
//                                 <Badge
//                                   variant="secondary"
//                                   className="bg-purple-600/20 text-purple-300"
//                                 >
//                                   {project.category}
//                                 </Badge>
//                               </td>
//                               <td className="py-4 text-white">
//                                 ${project.price?.toLocaleString()}
//                               </td>
//                               <td className="py-4 text-white">
//                                 {project.sales}
//                               </td>
//                               <td className="py-4 text-white">
//                                 ${project.revenue?.toLocaleString()}
//                               </td>
//                               <td className="py-4">
//                                 <Badge
//                                   className={
//                                     project.status === "active"
//                                       ? "bg-green-600/20 text-green-300"
//                                       : project.status === "draft"
//                                       ? "bg-yellow-600/20 text-yellow-300"
//                                       : "bg-gray-600/20 text-gray-300"
//                                   }
//                                 >
//                                   {project.status}
//                                 </Badge>
//                               </td>
//                               <td className="py-4">
//                                 <div className="flex items-center gap-2">
//                                   <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => setPreviewProject(project)}
//                                     className="border-gray-600/20 text-gray-600 hover:text-white  hover:bg-white/10"
//                                   >
//                                     <Eye className="h-4 w-4  " />
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => handleEditProject(project)}
//                                     className="border-gray-600/20 text-gray-600 hover:text-white hover:bg-white/10"
//                                   >
//                                     <Edit className="h-4 w-4" />
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() =>
//                                       handleDeleteProject(project.id)
//                                     }
//                                     className="border-red-400/20 text-red-400 hover:text-white hover:bg-red-400/10"
//                                   >
//                                     <Trash2 className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Inquiries Tab */}
//               <TabsContent value="inquiries" className="mt-6">
//                 <Card className="dashboard-card bg-white/5 border-white/10">
//                   <CardHeader>
//                     <CardTitle className="text-white">
//                       Customer Inquiries
//                     </CardTitle>
//                     <CardDescription className="text-white/70">
//                       Manage customer inquiries and project requests
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {inquiries.map((inquiry) => (
//                         <Card
//                           key={inquiry.id}
//                           className="bg-white/5 border-white/10"
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-4 mb-2">
//                                   <h3 className="text-white font-semibold">
//                                     {inquiry.name}
//                                   </h3>
//                                   <Badge
//                                     className={
//                                       inquiry.status === "new"
//                                         ? "bg-green-600/20 text-green-300"
//                                         : inquiry.status === "contacted"
//                                         ? "bg-blue-600/20 text-blue-300"
//                                         : "bg-gray-600/20 text-gray-300"
//                                     }
//                                   >
//                                     {inquiry.status}
//                                   </Badge>
//                                 </div>
//                                 <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70 mb-4">
//                                   <div>
//                                     <p>
//                                       <strong>Email:</strong> {inquiry.email}
//                                     </p>
//                                     <p>
//                                       <strong>Company:</strong>{" "}
//                                       {inquiry.company}
//                                     </p>
//                                   </div>
//                                   <div>
//                                     <p>
//                                       <strong>Project:</strong>{" "}
//                                       {inquiry.projectType}
//                                     </p>
//                                     <p>
//                                       <strong>Budget:</strong> {inquiry.budget}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <p className="text-white/80 mb-4">
//                                   {inquiry.message}
//                                 </p>
//                                 <div className="flex justify-between items-center text-white/50 text-xs">
//                                   <span>Received: {inquiry.createdAt}</span>
//                                   {inquiry.lastContact && (
//                                     <span>
//                                       Last Contact: {inquiry.lastContact}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="flex gap-2 ml-4">
//                                 <Button
//                                   size="sm"
//                                   onClick={() => handleReplyToInquiry(inquiry)}
//                                   className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                                 >
//                                   Reply
//                                 </Button>
//                                 <Select
//                                   value={inquiry.status}
//                                   onValueChange={(value) =>
//                                     handleUpdateInquiryStatus(inquiry.id, value)
//                                   }
//                                 >
//                                   <SelectTrigger className="w-32 h-8 bg-white/5 border-white/10 text-white text-xs">
//                                     <SelectValue />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="new">New</SelectItem>
//                                     <SelectItem value="contacted">
//                                       Contacted
//                                     </SelectItem>
//                                     <SelectItem value="in-progress">
//                                       In Progress
//                                     </SelectItem>
//                                     <SelectItem value="quoted">
//                                       Quoted
//                                     </SelectItem>
//                                     <SelectItem value="closed">
//                                       Closed
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Analytics Tab */}
//               <TabsContent value="analytics" className="mt-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Card className="dashboard-card bg-white/5 border-white/10">
//                     <CardHeader>
//                       <CardTitle className="text-white">
//                         Revenue Overview
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-white/70">This Month</span>
//                           <span className="text-white font-bold">
//                             ${Math.round(thisMonthRevenue).toLocaleString()}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-white/70">Last Month</span>
//                           <span className="text-white font-bold">
//                             ${Math.round(lastMonthRevenue).toLocaleString()}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-white/70">Total Revenue</span>
//                           <span className="text-white font-bold">
//                             ${totalRevenue.toLocaleString()}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-white/70">Growth Rate</span>
//                           <span
//                             className={`font-bold ${
//                               Number(revenueGrowth) >= 0
//                                 ? "text-green-400"
//                                 : "text-red-400"
//                             }`}
//                           >
//                             {Number(revenueGrowth) >= 0 ? "+" : ""}
//                             {revenueGrowth}%
//                           </span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="dashboard-card bg-white/5 border-white/10">
//                     <CardHeader>
//                       <CardTitle className="text-white">
//                         Top Performing Projects
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {projects
//                           .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
//                           .slice(0, 3)
//                           .map((project) => (
//                             <div
//                               key={project.id}
//                               className="flex justify-between items-center"
//                             >
//                               <div>
//                                 <p className="text-white font-medium">
//                                   {project.title}
//                                 </p>
//                                 <p className="text-white/60 text-sm">
//                                   {project.sales} sales
//                                 </p>
//                               </div>
//                               <span className="text-white font-bold">
//                                 ${(project.revenue || 0).toLocaleString()}
//                               </span>
//                             </div>
//                           ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>

//         {/* Project Preview Dialog */}
//         <Dialog
//           open={!!previewProject}
//           onOpenChange={(open) => !open && setPreviewProject(null)}
//         >
//           <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>
//                 Project Preview: {previewProject?.title}
//               </DialogTitle>
//               <DialogDescription className="text-white/70">
//                 Complete project information and details
//               </DialogDescription>
//             </DialogHeader>
//             {previewProject && (
//               <div className="space-y-6">
//                 {/* Basic Info */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       Basic Information
//                     </h3>
//                     <div className="space-y-2 text-sm">
//                       <p>
//                         <span className="text-white/60">Title:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.title}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Category:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.category}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Price:</span>{" "}
//                         <span className="text-white">
//                           ${previewProject.price?.toLocaleString()}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Running Cost:</span>{" "}
//                         <span className="text-white">
//                           ${previewProject.runningCost}/month
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Complexity:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.complexity}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Setup Time:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.setupTime}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       Status & Metrics
//                     </h3>
//                     <div className="space-y-2 text-sm">
//                       <p>
//                         <span className="text-white/60">Status:</span>{" "}
//                         <Badge
//                           className={
//                             previewProject.status === "active"
//                               ? "bg-green-600/20 text-green-300"
//                               : "bg-yellow-600/20 text-yellow-300"
//                           }
//                         >
//                           {previewProject.status}
//                         </Badge>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Sales:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.sales || 0}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Revenue:</span>{" "}
//                         <span className="text-white">
//                           ${(previewProject.revenue || 0).toLocaleString()}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Created:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.createdAt}
//                         </span>
//                       </p>
//                       <p>
//                         <span className="text-white/60">Updated:</span>{" "}
//                         <span className="text-white">
//                           {previewProject.updatedAt}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <h3 className="text-white font-semibold mb-2">Description</h3>
//                   <p className="text-white/80 text-sm">
//                     {previewProject.description}
//                   </p>
//                 </div>

//                 {/* Long Description */}
//                 {previewProject.longDescription && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       Detailed Description
//                     </h3>
//                     <p className="text-white/80 text-sm">
//                       {previewProject.longDescription}
//                     </p>
//                   </div>
//                 )}

//                 {/* Technologies */}
//                 <div>
//                   <h3 className="text-white font-semibold mb-2">
//                     Technologies
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {(Array.isArray(previewProject.tech)
//                       ? previewProject.tech
//                       : previewProject.tech?.split(",") || []
//                     ).map((tech: string, index: number) => (
//                       <Badge
//                         key={index}
//                         className="bg-purple-600/20 text-purple-300 text-xs"
//                       >
//                         {tech.trim()}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div>
//                   <h3 className="text-white font-semibold mb-2">Features</h3>
//                   <div className="grid md:grid-cols-2 gap-2">
//                     {(Array.isArray(previewProject.features)
//                       ? previewProject.features
//                       : previewProject.features?.split(",") || []
//                     ).map((feature: string, index: number) => (
//                       <div key={index} className="flex items-center text-sm">
//                         <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
//                         <span className="text-white/80">{feature.trim()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Tech Specs */}
//                 {previewProject.techSpecs && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       Technical Specifications
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <p>
//                           <span className="text-white/60">Frontend:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.frontend}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Backend:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.backend}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Database:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.database}
//                           </span>
//                         </p>
//                       </div>
//                       <div>
//                         <p>
//                           <span className="text-white/60">Authentication:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.authentication}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Payments:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.payments}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Deployment:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.techSpecs.deployment}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Requirements */}
//                 {previewProject.requirements && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       System Requirements
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <p>
//                           <span className="text-white/60">Server:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.requirements.server}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Database:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.requirements.database}
//                           </span>
//                         </p>
//                       </div>
//                       <div>
//                         <p>
//                           <span className="text-white/60">Storage:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.requirements.storage}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="text-white/60">Bandwidth:</span>{" "}
//                           <span className="text-white">
//                             {previewProject.requirements.bandwidth}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* What's Included */}
//                 {previewProject.included && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       What's Included
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-2">
//                       {(Array.isArray(previewProject.included)
//                         ? previewProject.included
//                         : previewProject.included?.split(",") || []
//                       ).map((item: string, index: number) => (
//                         <div key={index} className="flex items-center text-sm">
//                           <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
//                           <span className="text-white/80">{item.trim()}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Workflow */}
//                 {previewProject.workflow && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">
//                       Implementation Workflow
//                     </h3>
//                     <div className="space-y-2">
//                       {(Array.isArray(previewProject.workflow)
//                         ? previewProject.workflow
//                         : previewProject.workflow?.split(",") || []
//                       ).map((step: string, index: number) => (
//                         <div key={index} className="flex items-start text-sm">
//                           <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
//                             {index + 1}
//                           </div>
//                           <span className="text-white/80">{step.trim()}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Demo URL */}
//                 {previewProject.demoUrl && (
//                   <div>
//                     <h3 className="text-white font-semibold mb-2">Demo</h3>
//                     <a
//                       href={previewProject.demoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-purple-400 hover:text-purple-300 text-sm"
//                     >
//                       {previewProject.demoUrl}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             )}
//             <div className="flex justify-end">
//               <Button
//                 variant="outline"
//                 onClick={() => setPreviewProject(null)}
//                 className="border-white/30 text-white hover:bg-white/10"
//               >
//                 Close
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Project Dialog */}
//         <Dialog
//           open={!!editingProject}
//           onOpenChange={(open) => !open && setEditingProject(null)}
//         >
//           <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Edit Project</DialogTitle>
//               <DialogDescription className="text-white/70">
//                 Update project information
//               </DialogDescription>
//             </DialogHeader>
//             {editingProject && (
//               <div className="grid gap-6 py-4">
//                 {/* Basic Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                     Basic Information
//                   </h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-title">Project Title</Label>
//                       <Input
//                         id="edit-title"
//                         value={editingProject.title}
//                         onChange={(e) =>
//                           setEditingProject({
//                             ...editingProject,
//                             title: e.target.value,
//                           })
//                         }
//                         className="bg-white/5 border-white/10"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-category">Category</Label>
//                       <Select
//                         value={editingProject.category}
//                         onValueChange={(value) =>
//                           setEditingProject({
//                             ...editingProject,
//                             category: value,
//                           })
//                         }
//                       >
//                         <SelectTrigger className="bg-white/5 border-white/10">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                           <SelectItem value="Dashboard">Dashboard</SelectItem>
//                           <SelectItem value="Backend">Backend</SelectItem>
//                           <SelectItem value="CRM">CRM</SelectItem>
//                           <SelectItem value="Education">Education</SelectItem>
//                           <SelectItem value="Social">Social</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-description">Description</Label>
//                     <Input
//                       id="edit-description"
//                       value={editingProject.description}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           description: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-longDescription">
//                       Detailed Description
//                     </Label>
//                     <Textarea
//                       id="edit-longDescription"
//                       value={editingProject.longDescription || ""}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           longDescription: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                       rows={3}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-demoUrl">Demo URL</Label>
//                     <Input
//                       id="edit-demoUrl"
//                       value={editingProject.demoUrl || ""}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           demoUrl: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                     />
//                   </div>
//                 </div>

//                 {/* Pricing & Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                     Pricing & Details
//                   </h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-price">Price ($)</Label>
//                       <Input
//                         id="edit-price"
//                         type="number"
//                         value={editingProject.price}
//                         onChange={(e) =>
//                           setEditingProject({
//                             ...editingProject,
//                             price: e.target.value,
//                           })
//                         }
//                         className="bg-white/5 border-white/10"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-runningCost">
//                         Running Cost ($/month)
//                       </Label>
//                       <Input
//                         id="edit-runningCost"
//                         type="number"
//                         value={editingProject.runningCost}
//                         onChange={(e) =>
//                           setEditingProject({
//                             ...editingProject,
//                             runningCost: e.target.value,
//                           })
//                         }
//                         className="bg-white/5 border-white/10"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-sales">Sales Count</Label>
//                       <Input
//                         id="edit-sales"
//                         type="number"
//                         value={editingProject.sales}
//                         onChange={(e) =>
//                           setEditingProject({
//                             ...editingProject,
//                             sales: e.target.value,
//                           })
//                         }
//                         className="bg-white/5 border-white/10"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-revenue">Total Revenue ($)</Label>
//                       <Input
//                         id="edit-revenue"
//                         type="number"
//                         value={editingProject.revenue}
//                         onChange={(e) =>
//                           setEditingProject({
//                             ...editingProject,
//                             revenue: e.target.value,
//                           })
//                         }
//                         className="bg-white/5 border-white/10"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-complexity">Complexity</Label>
//                       <Select
//                         value={editingProject.complexity}
//                         onValueChange={(value) =>
//                           setEditingProject({
//                             ...editingProject,
//                             complexity: value,
//                           })
//                         }
//                       >
//                         <SelectTrigger className="bg-white/5 border-white/10">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Beginner">Beginner</SelectItem>
//                           <SelectItem value="Intermediate">
//                             Intermediate
//                           </SelectItem>
//                           <SelectItem value="Advanced">Advanced</SelectItem>
//                           <SelectItem value="Expert">Expert</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="edit-setupTime">Setup Time</Label>
//                       <Select
//                         value={editingProject.setupTime}
//                         onValueChange={(value) =>
//                           setEditingProject({
//                             ...editingProject,
//                             setupTime: value,
//                           })
//                         }
//                       >
//                         <SelectTrigger className="bg-white/5 border-white/10">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="1 day">1 day</SelectItem>
//                           <SelectItem value="1-2 days">1-2 days</SelectItem>
//                           <SelectItem value="2-3 days">2-3 days</SelectItem>
//                           <SelectItem value="3-4 days">3-4 days</SelectItem>
//                           <SelectItem value="4-5 days">4-5 days</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-status">Status</Label>
//                     <Select
//                       value={editingProject.status}
//                       onValueChange={(value) =>
//                         setEditingProject({ ...editingProject, status: value })
//                       }
//                     >
//                       <SelectTrigger className="bg-white/5 border-white/10">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="draft">Draft</SelectItem>
//                         <SelectItem value="active">Active</SelectItem>
//                         <SelectItem value="archived">Archived</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {/* Technologies & Features */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                     Technologies & Features
//                   </h3>
//                   <div className="space-y-2">
//                     <Label htmlFor="edit-tech">
//                       Technologies (comma separated)
//                     </Label>
//                     <Input
//                       id="edit-tech"
//                       value={editingProject.tech}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           tech: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-features">
//                       Features (comma separated)
//                     </Label>
//                     <Textarea
//                       id="edit-features"
//                       value={editingProject.features}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           features: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                       rows={3}
//                     />
//                   </div>
//                 </div>

//                 {/* What's Included & Workflow */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
//                     Package Details
//                   </h3>
//                   <div className="space-y-2">
//                     <Label htmlFor="edit-included">
//                       What's Included (comma separated)
//                     </Label>
//                     <Textarea
//                       id="edit-included"
//                       value={editingProject.included}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           included: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                       rows={3}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="edit-workflow">
//                       Implementation Workflow (comma separated)
//                     </Label>
//                     <Textarea
//                       id="edit-workflow"
//                       value={editingProject.workflow}
//                       onChange={(e) =>
//                         setEditingProject({
//                           ...editingProject,
//                           workflow: e.target.value,
//                         })
//                       }
//                       className="bg-white/5 border-white/10"
//                       rows={3}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="flex justify-end gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setEditingProject(null)}
//                 className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdateProject}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//               >
//                 Update Project
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Reply Dialog */}
//         <Dialog
//           open={!!replyingTo}
//           onOpenChange={(open) => !open && setReplyingTo(null)}
//         >
//           <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Reply to {replyingTo?.name}</DialogTitle>
//               <DialogDescription className="text-white/70">
//                 Send a reply to {replyingTo?.email} regarding their inquiry
//                 about {replyingTo?.projectType}
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div className="bg-white/5 p-4 rounded-lg border border-white/10">
//                 <h4 className="text-white font-medium mb-2">
//                   Original Message:
//                 </h4>
//                 <p className="text-white/70 text-sm">{replyingTo?.message}</p>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="reply-message" className="text-white">
//                   Your Reply
//                 </Label>
//                 <Textarea
//                   id="reply-message"
//                   value={replyMessage}
//                   onChange={(e) => setReplyMessage(e.target.value)}
//                   className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[150px]"
//                   placeholder="Type your reply here..."
//                 />
//               </div>
//               <div className="bg-white/5 p-3 rounded border border-white/10">
//                 <p className="text-white/60 text-xs">
//                   <strong>Note:</strong> This will send an email to{" "}
//                   {replyingTo?.email} and automatically mark the inquiry as
//                   "Contacted"
//                 </p>
//               </div>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setReplyingTo(null)}
//                 className="border-white/30 text-white hover:bg-white/10"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSendReply}
//                 disabled={!replyMessage.trim()}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//               >
//                 Send Reply
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </AuthGuard>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle,
} from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/hooks/use-auth";
import type { Project, CreateProjectData } from "@/types/project";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [replyingTo, setReplyingTo] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
    fetchInquiries();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const [newProject, setNewProject] = useState<CreateProjectData>({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    runningCost: "",
    category: "",
    tech: "",
    features: "",
    complexity: "Intermediate",
    setupTime: "1-2 days",
    status: "draft",
    demoUrl: "",
    sales: "",
    revenue: "",
    images: [""],
    techSpecs: {
      frontend: "",
      backend: "",
      database: "",
      authentication: "",
      payments: "",
      deployment: "",
    },
    requirements: {
      server: "",
      database: "",
      storage: "",
      bandwidth: "",
    },
    included: "",
    workflow: "",
  });

  const handleAddProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const project = await response.json();
        setProjects([...projects, project]);
        setNewProject({
          title: "",
          description: "",
          longDescription: "",
          price: "",
          runningCost: "",
          category: "",
          tech: "",
          features: "",
          complexity: "Intermediate",
          setupTime: "1-2 days",
          status: "draft",
          demoUrl: "",
          sales: "",
          revenue: "",
          images: [""],
          techSpecs: {
            frontend: "",
            backend: "",
            database: "",
            authentication: "",
            payments: "",
            deployment: "",
          },
          requirements: {
            server: "",
            database: "",
            storage: "",
            bandwidth: "",
          },
          included: "",
          workflow: "",
        });
        setIsAddingProject(false);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({
      ...project,
      tech: Array.isArray(project.tech)
        ? project.tech.join(", ")
        : project.tech,
      features: Array.isArray(project.features)
        ? project.features.join(", ")
        : project.features,
      included: Array.isArray(project.included)
        ? project.included.join(", ")
        : project.included,
      workflow: Array.isArray(project.workflow)
        ? project.workflow.join(", ")
        : project.workflow,
      price: project.price.toString(),
      runningCost: project.runningCost.toString(),
      sales: project.sales.toString(),
      revenue: project.revenue.toString(),
      techSpecs: project.techSpecs || {
        frontend: "",
        backend: "",
        database: "",
        authentication: "",
        payments: "",
        deployment: "",
      },
      requirements: project.requirements || {
        server: "",
        database: "",
        storage: "",
        bandwidth: "",
      },
    });
  };

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(
          projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const totalSales = projects.reduce((sum, p) => sum + (p.sales || 0), 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const thisMonthRevenue = projects.reduce((sum, p) => {
    return sum + (p.revenue || 0) * 0.3;
  }, 0);

  const lastMonthRevenue = projects.reduce((sum, p) => {
    return sum + (p.revenue || 0) * 0.25;
  }, 0);

  const revenueGrowth =
    lastMonthRevenue > 0
      ? (
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
          100
        ).toFixed(1)
      : "0";

  const thisWeekSales = projects.reduce((sum, p) => {
    return sum + Math.floor((p.sales || 0) * 0.2);
  }, 0);

  const handleReplyToInquiry = (inquiry: Inquiry) => {
    setReplyingTo(inquiry);
    setReplyMessage(
      `Hi ${inquiry.name},\n\nThank you for your interest in ${inquiry.projectType}. `
    );
  };

  const handleSendReply = () => {
    console.log("Sending reply to:", replyingTo?.email);
    console.log("Message:", replyMessage);

    if (replyingTo) {
      setInquiries(
        inquiries.map((inq) =>
          inq.id === replyingTo.id
            ? {
                ...inq,
                status: "contacted",
                updatedAt: new Date().toISOString(),
              }
            : inq
        )
      );
    }

    setReplyingTo(null);
    setReplyMessage("");
  };

  const handleUpdateInquiryStatus = (inquiryId: number, newStatus: string) => {
    setInquiries(
      inquiries.map((inq) =>
        inq.id === inquiryId
          ? { ...inq, status: newStatus, updatedAt: new Date().toISOString() }
          : inq
      )
    );
  };

  const { logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-white">
                Dev<span className="text-purple-400">Projects</span>{" "}
                <span className="text-sm text-purple-300">Admin</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
                  >
                    View Site
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20 p-6" ref={dashboardRef}>
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/70">
                Manage your projects, track sales, and handle customer inquiries
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="dashboard-card bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400">
                    +{revenueGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Total Sales
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {totalSales}
                  </div>
                  <p className="text-xs text-blue-400">
                    +{thisWeekSales} this week
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Active Projects
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {activeProjects}
                  </div>
                  <p className="text-xs text-purple-400">
                    of {projects.length} total
                  </p>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    New Inquiries
                  </CardTitle>
                  <Users className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {newInquiries}
                  </div>
                  <p className="text-xs text-yellow-400">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-purple-600"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="inquiries"
                  className="data-[state=active]:bg-purple-600"
                >
                  Inquiries
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-purple-600"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-6">
                <Card className="dashboard-card bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">
                          Projects Management
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Manage your project catalog and track performance
                        </CardDescription>
                      </div>
                      <Dialog
                        open={isAddingProject}
                        onOpenChange={setIsAddingProject}
                      >
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Project
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add New Project</DialogTitle>
                            <DialogDescription className="text-white/70">
                              Create a new project for your catalog
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                                Basic Information
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="title">Project Title *</Label>
                                  <Input
                                    id="title"
                                    value={newProject.title}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        title: e.target.value,
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="E-Commerce Platform"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="category">Category *</Label>
                                  <Select
                                    value={newProject.category}
                                    onValueChange={(value) =>
                                      setNewProject({
                                        ...newProject,
                                        category: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="E-Commerce">
                                        E-Commerce
                                      </SelectItem>
                                      <SelectItem value="Dashboard">
                                        Dashboard
                                      </SelectItem>
                                      <SelectItem value="Backend">
                                        Backend
                                      </SelectItem>
                                      <SelectItem value="CRM">CRM</SelectItem>
                                      <SelectItem value="Education">
                                        Education
                                      </SelectItem>
                                      <SelectItem value="Social">
                                        Social
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="images">
                                  Project Images (URLs)
                                </Label>
                                <div className="space-y-2">
                                  {newProject?.images?.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                      <Input
                                        id={`image-${index}`}
                                        value={url}
                                        onChange={(e) => {
                                          const updatedImages = [
                                            ...(newProject?.images || []),
                                          ];
                                          updatedImages[index] = e.target.value;
                                          setNewProject({
                                            ...newProject,
                                            images: updatedImages,
                                          });
                                        }}
                                        className="bg-white/5 border-white/10 flex-1"
                                        placeholder="https://example.com/image.jpg"
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                          const updatedImages = [
                                            ...(newProject.images || []),
                                          ];
                                          updatedImages.splice(index, 1);
                                          setNewProject({
                                            ...newProject,
                                            images: updatedImages.length
                                              ? updatedImages
                                              : [""],
                                          });
                                        }}
                                        className="border-white/10 text-gray-600 hover:text-white/70 hover:text-white hover:bg-white/10"
                                        disabled={
                                          newProject?.images?.length === 1
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="h-4 w-4"
                                        >
                                          <path d="M18 6 6 18" />
                                          <path d="m6 6 12 12" />
                                        </svg>
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setNewProject({
                                        ...newProject,
                                        images: [
                                          ...(newProject?.images || []),
                                          "",
                                        ],
                                      });
                                    }}
                                    className="mt-2 border-white/10 text-gray-700 hover:text-white/70 hover:text-white hover:bg-white/10"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4 mr-2"
                                    >
                                      <path d="M5 12h14" />
                                      <path d="M12 5v14" />
                                    </svg>
                                    Add Image URL
                                  </Button>
                                </div>
                                <p className="text-xs text-white/50">
                                  Add URLs for project images. At least one
                                  image is recommended.
                                </p>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="description">
                                  Short Description *
                                </Label>
                                <Input
                                  id="description"
                                  value={newProject.description}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
                                      description: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10"
                                  placeholder="Complete e-commerce solution with inventory management"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="longDescription">
                                  Detailed Description
                                </Label>
                                <Textarea
                                  id="longDescription"
                                  value={newProject.longDescription}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
                                      longDescription: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10"
                                  rows={4}
                                  placeholder="A comprehensive e-commerce platform built with modern technologies..."
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="demoUrl">Demo URL</Label>
                                <Input
                                  id="demoUrl"
                                  value={newProject.demoUrl}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
                                      demoUrl: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10"
                                  placeholder="https://demo.example.com"
                                />
                              </div>
                            </div>

                            {/* Pricing & Details */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                                Pricing & Details
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="price">Price ($) *</Label>
                                  <Input
                                    id="price"
                                    type="number"
                                    value={newProject.price}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        price: e.target.value,
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="2999"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="runningCost">
                                    Running Cost ($/month) *
                                  </Label>
                                  <Input
                                    id="runningCost"
                                    type="number"
                                    value={newProject.runningCost}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        runningCost: e.target.value,
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="50"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="sales">Sales Count</Label>
                                  <Input
                                    id="sales"
                                    type="number"
                                    value={newProject.sales}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        sales: e.target.value,
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="0"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="revenue">
                                    Total Revenue ($)
                                  </Label>
                                  <Input
                                    id="revenue"
                                    type="number"
                                    value={newProject.revenue}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        revenue: e.target.value,
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="0"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="complexity">
                                    Complexity *
                                  </Label>
                                  <Select
                                    value={newProject.complexity}
                                    onValueChange={(value) =>
                                      setNewProject({
                                        ...newProject,
                                        complexity: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Beginner">
                                        Beginner
                                      </SelectItem>
                                      <SelectItem value="Intermediate">
                                        Intermediate
                                      </SelectItem>
                                      <SelectItem value="Advanced">
                                        Advanced
                                      </SelectItem>
                                      <SelectItem value="Expert">
                                        Expert
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="setupTime">
                                    Setup Time *
                                  </Label>
                                  <Select
                                    value={newProject.setupTime}
                                    onValueChange={(value) =>
                                      setNewProject({
                                        ...newProject,
                                        setupTime: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1 day">
                                        1 day
                                      </SelectItem>
                                      <SelectItem value="1-2 days">
                                        1-2 days
                                      </SelectItem>
                                      <SelectItem value="2-3 days">
                                        2-3 days
                                      </SelectItem>
                                      <SelectItem value="3-4 days">
                                        3-4 days
                                      </SelectItem>
                                      <SelectItem value="4-5 days">
                                        4-5 days
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                  value={newProject.status}
                                  onValueChange={(value) =>
                                    setNewProject({
                                      ...newProject,
                                      status: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="active">
                                      Active
                                    </SelectItem>
                                    <SelectItem value="archived">
                                      Archived
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Technologies & Features */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                                Technologies & Features
                              </h3>
                              <div className="space-y-2">
                                <Label htmlFor="tech">
                                  Technologies (comma separated) *
                                </Label>
                                <Input
                                  id="tech"
                                  value={newProject.tech}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
                                      tech: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10"
                                  placeholder="Next.js, Stripe, PostgreSQL, Tailwind CSS, Prisma, NextAuth"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="features">
                                  Features (comma separated) *
                                </Label>
                                <Textarea
                                  id="features"
                                  value={newProject.features}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
                                      features: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10"
                                  placeholder="Payment Integration with Stripe, Inventory Management System, Admin Dashboard, Mobile Responsive Design"
                                  rows={3}
                                />
                              </div>
                            </div>

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
                                    value={newProject.techSpecs?.frontend || ""}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
                                          frontend: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="Next.js 15, React 18, Tailwind CSS"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="backend">Backend</Label>
                                  <Input
                                    id="backend"
                                    value={newProject.techSpecs?.backend || ""}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
                                          backend: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="Next.js API Routes, Prisma ORM"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="database">Database</Label>
                                  <Input
                                    id="database"
                                    value={newProject.techSpecs?.database || ""}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
                                          database: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="PostgreSQL"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="authentication">
                                    Authentication
                                  </Label>
                                  <Input
                                    id="authentication"
                                    value={
                                      newProject.techSpecs?.authentication || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
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
                                    value={newProject.techSpecs?.payments || ""}
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
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
                                    value={
                                      newProject.techSpecs?.deployment || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        techSpecs: {
                                          ...newProject.techSpecs!,
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
                                  <Label htmlFor="server">
                                    Server Requirements
                                  </Label>
                                  <Input
                                    id="server"
                                    value={
                                      newProject.requirements?.server || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        requirements: {
                                          ...newProject.requirements!,
                                          server: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="2GB RAM, 1 CPU Core minimum"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="reqDatabase">
                                    Database Requirements
                                  </Label>
                                  <Input
                                    id="reqDatabase"
                                    value={
                                      newProject.requirements?.database || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        requirements: {
                                          ...newProject.requirements!,
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
                                  <Label htmlFor="storage">
                                    Storage Requirements
                                  </Label>
                                  <Input
                                    id="storage"
                                    value={
                                      newProject.requirements?.storage || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        requirements: {
                                          ...newProject.requirements!,
                                          storage: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-white/5 border-white/10"
                                    placeholder="10GB minimum"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bandwidth">
                                    Bandwidth Requirements
                                  </Label>
                                  <Input
                                    id="bandwidth"
                                    value={
                                      newProject.requirements?.bandwidth || ""
                                    }
                                    onChange={(e) =>
                                      setNewProject({
                                        ...newProject,
                                        requirements: {
                                          ...newProject.requirements!,
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
                                  value={newProject.included}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
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
                                  value={newProject.workflow}
                                  onChange={(e) =>
                                    setNewProject({
                                      ...newProject,
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
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsAddingProject(false)}
                              className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleAddProject}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              Add Project
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                        <Input
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        />
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Projects Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left text-white/70 pb-3">
                              Project
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Category
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Price
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Sales
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Revenue
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Status
                            </th>
                            <th className="text-left text-white/70 pb-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.map((project) => (
                            <tr
                              key={project.id}
                              className="border-b border-white/5"
                            >
                              <td className="py-4">
                                <div>
                                  <p className="text-white font-medium">
                                    {project.title}
                                  </p>
                                  <p className="text-white/60 text-sm">
                                    {project.description}
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
                                {project.sales}
                              </td>
                              <td className="py-4 text-white">
                                ${project.revenue?.toLocaleString()}
                              </td>
                              <td className="py-4">
                                <Badge
                                  className={
                                    project.status === "active"
                                      ? "bg-green-600/20 text-green-300"
                                      : project.status === "draft"
                                      ? "bg-yellow-600/20 text-yellow-300"
                                      : "bg-gray-600/20 text-gray-300"
                                  }
                                >
                                  {project.status}
                                </Badge>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setPreviewProject(project)}
                                    className="border-gray-200 text-gray-600 hover:text-white/80 hover:bg-white/10"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditProject(project)}
                                    className="border-gray-200 text-gray-600 hover:text-white/80 hover:bg-white/10"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDeleteProject(project.id)
                                    }
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
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries" className="mt-6">
                <Card className="dashboard-card bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Customer Inquiries
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Manage customer inquiries and project requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <Card
                          key={inquiry.id}
                          className="bg-white/5 border-white/10"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="text-white font-semibold">
                                    {inquiry.name}
                                  </h3>
                                  <Badge
                                    className={
                                      inquiry.status === "new"
                                        ? "bg-green-600/20 text-green-300"
                                        : inquiry.status === "contacted"
                                        ? "bg-blue-600/20 text-blue-300"
                                        : "bg-gray-600/20 text-gray-300"
                                    }
                                  >
                                    {inquiry.status}
                                  </Badge>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70 mb-4">
                                  <div>
                                    <p>
                                      <strong>Email:</strong> {inquiry.email}
                                    </p>
                                    <p>
                                      <strong>Company:</strong>{" "}
                                      {inquiry.company}
                                    </p>
                                  </div>
                                  <div>
                                    <p>
                                      <strong>Project:</strong>{" "}
                                      {inquiry.projectType}
                                    </p>
                                    <p>
                                      <strong>Budget:</strong> {inquiry.budget}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-white/80 mb-4">
                                  {inquiry.message}
                                </p>
                                <div className="flex justify-between items-center text-white/50 text-xs">
                                  <span>
                                    Received:{" "}
                                    {new Date(
                                      inquiry.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                  <span>
                                    Updated:{" "}
                                    {new Date(
                                      inquiry.updatedAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleReplyToInquiry(inquiry)}
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                  Reply
                                </Button>
                                <Select
                                  value={inquiry.status}
                                  onValueChange={(value) =>
                                    handleUpdateInquiryStatus(inquiry.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-32 h-8 bg-white/5 border-white/10 text-white text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">
                                      Contacted
                                    </SelectItem>
                                    <SelectItem value="in-progress">
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value="quoted">
                                      Quoted
                                    </SelectItem>
                                    <SelectItem value="closed">
                                      Closed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="dashboard-card bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Revenue Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">This Month</span>
                          <span className="text-white font-bold">
                            ${Math.round(thisMonthRevenue).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Last Month</span>
                          <span className="text-white font-bold">
                            ${Math.round(lastMonthRevenue).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Total Revenue</span>
                          <span className="text-white font-bold">
                            ${totalRevenue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Growth Rate</span>
                          <span
                            className={`font-bold ${
                              Number(revenueGrowth) >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {Number(revenueGrowth) >= 0 ? "+" : ""}
                            {revenueGrowth}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Top Performing Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {projects
                          .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
                          .slice(0, 3)
                          .map((project) => (
                            <div
                              key={project.id}
                              className="flex justify-between items-center"
                            >
                              <div>
                                <p className="text-white font-medium">
                                  {project.title}
                                </p>
                                <p className="text-white/60 text-sm">
                                  {project.sales} sales
                                </p>
                              </div>
                              <span className="text-white font-bold">
                                ${(project.revenue || 0).toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Project Preview Dialog */}
        <Dialog
          open={!!previewProject}
          onOpenChange={(open) => !open && setPreviewProject(null)}
        >
          <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Project Preview: {previewProject?.title}
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Complete project information and details
              </DialogDescription>
            </DialogHeader>
            {previewProject && (
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
                        <span className="text-white">
                          {previewProject.title}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Category:</span>{" "}
                        <span className="text-white">
                          {previewProject.category}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Price:</span>{" "}
                        <span className="text-white">
                          ${previewProject.price?.toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Running Cost:</span>{" "}
                        <span className="text-white">
                          ${previewProject.runningCost}/month
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Complexity:</span>{" "}
                        <span className="text-white">
                          {previewProject.complexity}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Setup Time:</span>{" "}
                        <span className="text-white">
                          {previewProject.setupTime}
                        </span>
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
                            previewProject.status === "active"
                              ? "bg-green-600/20 text-green-300"
                              : "bg-yellow-600/20 text-yellow-300"
                          }
                        >
                          {previewProject.status}
                        </Badge>
                      </p>
                      <p>
                        <span className="text-white/60">Sales:</span>{" "}
                        <span className="text-white">
                          {previewProject.sales || 0}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Revenue:</span>{" "}
                        <span className="text-white">
                          ${(previewProject.revenue || 0).toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Created:</span>{" "}
                        <span className="text-white">
                          {new Date(
                            previewProject.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-white/60">Updated:</span>{" "}
                        <span className="text-white">
                          {new Date(
                            previewProject.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-white/80 text-sm">
                    {previewProject.description}
                  </p>
                </div>

                {/* Long Description */}
                {previewProject.longDescription && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Detailed Description
                    </h3>
                    <p className="text-white/80 text-sm">
                      {previewProject.longDescription}
                    </p>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(previewProject.tech)
                      ? previewProject.tech
                      : previewProject.tech?.split(",") || []
                    ).map((tech: string, index: number) => (
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
                    {(Array.isArray(previewProject.features)
                      ? previewProject.features
                      : previewProject.features?.split(",") || []
                    ).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-white/80">{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Specs */}
                {previewProject.techSpecs && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Technical Specifications
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <span className="text-white/60">Frontend:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.frontend}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Backend:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.backend}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Database:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.database}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="text-white/60">Authentication:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.authentication}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Payments:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.payments}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Deployment:</span>{" "}
                          <span className="text-white">
                            {previewProject.techSpecs.deployment}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {previewProject.requirements && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      System Requirements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <span className="text-white/60">Server:</span>{" "}
                          <span className="text-white">
                            {previewProject.requirements.server}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Database:</span>{" "}
                          <span className="text-white">
                            {previewProject.requirements.database}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="text-white/60">Storage:</span>{" "}
                          <span className="text-white">
                            {previewProject.requirements.storage}
                          </span>
                        </p>
                        <p>
                          <span className="text-white/60">Bandwidth:</span>{" "}
                          <span className="text-white">
                            {previewProject.requirements.bandwidth}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {previewProject.included && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      What&apos;s Included
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {(Array.isArray(previewProject.included)
                        ? previewProject.included
                        : previewProject.included?.split(",") || []
                      ).map((item: string, index: number) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-white/80">{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow */}
                {previewProject.workflow && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Implementation Workflow
                    </h3>
                    <div className="space-y-2">
                      {(Array.isArray(previewProject.workflow)
                        ? previewProject.workflow
                        : previewProject.workflow?.split(",") || []
                      ).map((step: string, index: number) => (
                        <div key={index} className="flex items-start text-sm">
                          <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-white/80">{step.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Demo URL */}
                {previewProject.demoUrl && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Demo</h3>
                    <a
                      href={previewProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      {previewProject.demoUrl}
                    </a>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setPreviewProject(null)}
                className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Project Dialog */}
        <Dialog
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
        >
          <DialogContent className="bg-slate-900 border-white/10 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription className="text-white/70">
                Update project information
              </DialogDescription>
            </DialogHeader>
            {editingProject && (
              <div className="grid gap-6 py-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Project Title</Label>
                      <Input
                        id="edit-title"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Select
                        value={editingProject.category}
                        onValueChange={(value) =>
                          setEditingProject({
                            ...editingProject,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                          <SelectItem value="Dashboard">Dashboard</SelectItem>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="CRM">CRM</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-images">Project Images (URLs)</Label>
                    <div className="space-y-2">
                      {editingProject.images?.map(
                        (url: string, index: number) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              id={`edit-image-${index}`}
                              value={url}
                              onChange={(e) => {
                                const updatedImages = [
                                  ...(editingProject.images || []),
                                ];
                                updatedImages[index] = e.target.value;
                                setEditingProject({
                                  ...editingProject,
                                  images: updatedImages,
                                });
                              }}
                              className="bg-white/5 border-white/10 flex-1"
                              placeholder="https://example.com/image.jpg"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const updatedImages = [
                                  ...(editingProject.images || []),
                                ];
                                updatedImages.splice(index, 1);
                                setEditingProject({
                                  ...editingProject,
                                  images: updatedImages.length
                                    ? updatedImages
                                    : [""],
                                });
                              }}
                              className="border-white/10 text-gray-700 hover:text-white/70 hover:text-white hover:bg-white/10"
                              disabled={
                                (editingProject.images || []).length === 1
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingProject({
                            ...editingProject,
                            images: [...(editingProject.images || []), ""],
                          });
                        }}
                        className="mt-2 border-white/10 text-gray-700 hover:text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Add Image URL
                      </Button>
                    </div>
                    <p className="text-xs text-white/50">
                      Add URLs for project images. At least one image is
                      recommended.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Input
                      id="edit-description"
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-longDescription">
                      Detailed Description
                    </Label>
                    <Textarea
                      id="edit-longDescription"
                      value={editingProject.longDescription || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          longDescription: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-demoUrl">Demo URL</Label>
                    <Input
                      id="edit-demoUrl"
                      value={editingProject.demoUrl || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          demoUrl: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* Pricing & Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Pricing & Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price ($)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        value={editingProject.price}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            price: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-runningCost">
                        Running Cost ($/month)
                      </Label>
                      <Input
                        id="edit-runningCost"
                        type="number"
                        value={editingProject.runningCost}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            runningCost: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-sales">Sales Count</Label>
                      <Input
                        id="edit-sales"
                        type="number"
                        value={editingProject.sales}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            sales: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-revenue">Total Revenue ($)</Label>
                      <Input
                        id="edit-revenue"
                        type="number"
                        value={editingProject.revenue}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            revenue: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-complexity">Complexity</Label>
                      <Select
                        value={editingProject.complexity}
                        onValueChange={(value) =>
                          setEditingProject({
                            ...editingProject,
                            complexity: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-setupTime">Setup Time</Label>
                      <Select
                        value={editingProject.setupTime}
                        onValueChange={(value) =>
                          setEditingProject({
                            ...editingProject,
                            setupTime: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 day">1 day</SelectItem>
                          <SelectItem value="1-2 days">1-2 days</SelectItem>
                          <SelectItem value="2-3 days">2-3 days</SelectItem>
                          <SelectItem value="3-4 days">3-4 days</SelectItem>
                          <SelectItem value="4-5 days">4-5 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingProject.status}
                      onValueChange={(value) =>
                        setEditingProject({ ...editingProject, status: value })
                      }
                    >
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Technologies & Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Technologies & Features
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="edit-tech">
                      Technologies (comma separated)
                    </Label>
                    <Input
                      id="edit-tech"
                      value={editingProject.tech}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          tech: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-features">
                      Features (comma separated)
                    </Label>
                    <Textarea
                      id="edit-features"
                      value={editingProject.features}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          features: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-frontend">Frontend</Label>
                      <Input
                        id="edit-frontend"
                        value={editingProject.techSpecs?.frontend || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              frontend: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-backend">Backend</Label>
                      <Input
                        id="edit-backend"
                        value={editingProject.techSpecs?.backend || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              backend: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-database">Database</Label>
                      <Input
                        id="edit-database"
                        value={editingProject.techSpecs?.database || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              database: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-authentication">
                        Authentication
                      </Label>
                      <Input
                        id="edit-authentication"
                        value={editingProject.techSpecs?.authentication || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              authentication: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-payments">Payments</Label>
                      <Input
                        id="edit-payments"
                        value={editingProject.techSpecs?.payments || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              payments: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-deployment">Deployment</Label>
                      <Input
                        id="edit-deployment"
                        value={editingProject.techSpecs?.deployment || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            techSpecs: {
                              ...editingProject.techSpecs,
                              deployment: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
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
                      <Label htmlFor="edit-server">Server Requirements</Label>
                      <Input
                        id="edit-server"
                        value={editingProject.requirements?.server || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            requirements: {
                              ...editingProject.requirements,
                              server: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-reqDatabase">
                        Database Requirements
                      </Label>
                      <Input
                        id="edit-reqDatabase"
                        value={editingProject.requirements?.database || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            requirements: {
                              ...editingProject.requirements,
                              database: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-storage">Storage Requirements</Label>
                      <Input
                        id="edit-storage"
                        value={editingProject.requirements?.storage || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            requirements: {
                              ...editingProject.requirements,
                              storage: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-bandwidth">
                        Bandwidth Requirements
                      </Label>
                      <Input
                        id="edit-bandwidth"
                        value={editingProject.requirements?.bandwidth || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            requirements: {
                              ...editingProject.requirements,
                              bandwidth: e.target.value,
                            },
                          })
                        }
                        className="bg-white/5 border-white/10"
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
                    <Label htmlFor="edit-included">
                      What&apos;s Included (comma separated)
                    </Label>
                    <Textarea
                      id="edit-included"
                      value={editingProject.included}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          included: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-workflow">
                      Implementation Workflow (comma separated)
                    </Label>
                    <Textarea
                      id="edit-workflow"
                      value={editingProject.workflow}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          workflow: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingProject(null)}
                className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProject}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Update Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reply Dialog */}
        <Dialog
          open={!!replyingTo}
          onOpenChange={(open) => !open && setReplyingTo(null)}
        >
          <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reply to {replyingTo?.name}</DialogTitle>
              <DialogDescription className="text-white/70">
                Send a reply to {replyingTo?.email} regarding their inquiry
                about {replyingTo?.projectType}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-2">
                  Original Message:
                </h4>
                <p className="text-white/70 text-sm">{replyingTo?.message}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply-message" className="text-white">
                  Your Reply
                </Label>
                <Textarea
                  id="reply-message"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[150px]"
                  placeholder="Type your reply here..."
                />
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="text-white/60 text-xs">
                  <strong>Note:</strong> This will send an email to{" "}
                  {replyingTo?.email} and automatically mark the inquiry as
                  &apos;Contacted&apos;
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setReplyingTo(null)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendReply}
                disabled={!replyMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Send Reply
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AuthGuard>
  );
}
