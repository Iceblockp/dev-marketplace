"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CheckCircle, ExternalLink, DollarSign, Clock, Zap, Server } from "lucide-react"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string)
    }
  }, [params.id])

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      }
    } catch (error) {
      console.error("Failed to fetch project:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/70">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300">{project.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{project.description}</p>
        </div>

        {/* Key Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Price</h3>
              <p className="text-2xl font-bold text-green-400">${project.price.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Setup Time</h3>
              <p className="text-xl font-bold text-blue-400">{project.setupTime}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Complexity</h3>
              <p className="text-xl font-bold text-yellow-400">{project.complexity}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Server className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Running Cost</h3>
              <p className="text-xl font-bold text-purple-400">${project.runningCost}/mo</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3">Description</h3>
                      <p className="text-white/80">{project.longDescription || project.description}</p>
                    </div>

                    {project.demoUrl && (
                      <div>
                        <h3 className="text-white font-semibold mb-3">Live Demo</h3>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Demo
                          </a>
                        </Button>
                      </div>
                    )}

                    {project.techSpecs && (
                      <div>
                        <h3 className="text-white font-semibold mb-3">Technical Specifications</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <span className="text-white/60">Frontend:</span>{" "}
                              <span className="text-white">{project.techSpecs.frontend}</span>
                            </p>
                            <p>
                              <span className="text-white/60">Backend:</span>{" "}
                              <span className="text-white">{project.techSpecs.backend}</span>
                            </p>
                            <p>
                              <span className="text-white/60">Database:</span>{" "}
                              <span className="text-white">{project.techSpecs.database}</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              <span className="text-white/60">Authentication:</span>{" "}
                              <span className="text-white">{project.techSpecs.authentication}</span>
                            </p>
                            <p>
                              <span className="text-white/60">Payments:</span>{" "}
                              <span className="text-white">{project.techSpecs.payments}</span>
                            </p>
                            <p>
                              <span className="text-white/60">Deployment:</span>{" "}
                              <span className="text-white">{project.techSpecs.deployment}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Features Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tech" className="mt-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((technology: string, index: number) => (
                        <Badge key={index} className="bg-purple-600/20 text-purple-300">
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="workflow" className="mt-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Implementation Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.workflow.map((step: string, index: number) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-white/80 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.included.map((item: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {project.requirements && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">System Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Server:</span>{" "}
                    <span className="text-white">{project.requirements.server}</span>
                  </p>
                  <p>
                    <span className="text-white/60">Database:</span>{" "}
                    <span className="text-white">{project.requirements.database}</span>
                  </p>
                  <p>
                    <span className="text-white/60">Storage:</span>{" "}
                    <span className="text-white">{project.requirements.storage}</span>
                  </p>
                  <p>
                    <span className="text-white/60">Bandwidth:</span>{" "}
                    <span className="text-white">{project.requirements.bandwidth}</span>
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <p className="text-3xl font-bold text-white">${project.price.toLocaleString()}</p>
                  <p className="text-white/60">One-time purchase</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4">
                  Purchase Project
                </Button>
                <p className="text-xs text-white/50">30-day money-back guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
