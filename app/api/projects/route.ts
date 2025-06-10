import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const data = await req.json()

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        price: Number.parseInt(data.price),
        runningCost: Number.parseInt(data.runningCost),
        category: data.category,
        tech: data.tech
          .split(",")
          .map((t: string) => t.trim())
          .filter((t: string) => t),
        features: data.features
          .split(",")
          .map((f: string) => f.trim())
          .filter((f: string) => f),
        complexity: data.complexity,
        setupTime: data.setupTime,
        demoUrl: data.demoUrl,
        status: data.status,
        sales: Number.parseInt(data.sales) || 0,
        revenue: Number.parseInt(data.revenue) || 0,
        images: [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        techSpecs: {
          frontend: data.techSpecs.frontend,
          backend: data.techSpecs.backend,
          database: data.techSpecs.database,
          authentication: data.techSpecs.authentication,
          payments: data.techSpecs.payments,
          deployment: data.techSpecs.deployment,
        },
        requirements: {
          server: data.requirements.server,
          database: data.requirements.database,
          storage: data.requirements.storage,
          bandwidth: data.requirements.bandwidth,
        },
        included: data.included
          .split(",")
          .map((i: string) => i.trim())
          .filter((i: string) => i),
        workflow: data.workflow
          .split(",")
          .map((w: string) => w.trim())
          .filter((w: string) => w),
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
})
