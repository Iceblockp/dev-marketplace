import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number.parseInt(params.id) },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export const PUT = withAuth(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    const data = await req.json()

    const project = await prisma.project.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        price: Number.parseInt(data.price),
        runningCost: Number.parseInt(data.runningCost),
        category: data.category,
        tech: data.tech.split(",").map((t: string) => t.trim()),
        features: data.features.split(",").map((f: string) => f.trim()),
        complexity: data.complexity,
        setupTime: data.setupTime,
        demoUrl: data.demoUrl,
        status: data.status,
        sales: Number.parseInt(data.sales),
        revenue: Number.parseInt(data.revenue),
        techSpecs: {
          frontend: data.techSpecs?.frontend,
          backend: data.techSpecs?.backend,
          database: data.techSpecs?.database,
          authentication: data.techSpecs?.authentication,
          payments: data.techSpecs?.payments,
          deployment: data.techSpecs?.deployment,
        },
        requirements: {
          server: data.requirements?.server,
          database: data.requirements?.database,
          storage: data.requirements?.storage,
          bandwidth: data.requirements?.bandwidth,
        },
        included: data.included.split(",").map((i: string) => i.trim()),
        workflow: data.workflow.split(",").map((w: string) => w.trim()),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
})

export const DELETE = withAuth(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await prisma.project.delete({
      where: { id: Number.parseInt(params.id) },
    })

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
})
