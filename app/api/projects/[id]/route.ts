// import { type NextRequest, NextResponse } from "next/server"
// import { withAuth } from "@/lib/middleware"
// import { prisma } from "@/lib/prisma"

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: Number.parseInt(params.id) },
//     })

//     if (!project) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 })
//     }

//     return NextResponse.json(project)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
//   }
// }

// export const PUT = withAuth(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
//   try {
//     const data = await req.json()

//     const project = await prisma.project.update({
//       where: { id: Number.parseInt(params.id) },
//       data: {
//         title: data.title,
//         description: data.description,
//         longDescription: data.longDescription,
//         price: Number.parseInt(data.price),
//         runningCost: Number.parseInt(data.runningCost),
//         category: data.category,
//         tech: data.tech.split(",").map((t: string) => t.trim()),
//         features: data.features.split(",").map((f: string) => f.trim()),
//         complexity: data.complexity,
//         setupTime: data.setupTime,
//         demoUrl: data.demoUrl,
//         status: data.status,
//         sales: Number.parseInt(data.sales),
//         revenue: Number.parseInt(data.revenue),
//         techSpecs: {
//           frontend: data.techSpecs?.frontend,
//           backend: data.techSpecs?.backend,
//           database: data.techSpecs?.database,
//           authentication: data.techSpecs?.authentication,
//           payments: data.techSpecs?.payments,
//           deployment: data.techSpecs?.deployment,
//         },
//         requirements: {
//           server: data.requirements?.server,
//           database: data.requirements?.database,
//           storage: data.requirements?.storage,
//           bandwidth: data.requirements?.bandwidth,
//         },
//         included: data.included.split(",").map((i: string) => i.trim()),
//         workflow: data.workflow.split(",").map((w: string) => w.trim()),
//         updatedAt: new Date(),
//       },
//     })

//     return NextResponse.json(project)
//   } catch (error) {
//     console.error("Error updating project:", error)
//     return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
//   }
// })

// export const DELETE = withAuth(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
//   try {
//     await prisma.project.delete({
//       where: { id: Number.parseInt(params.id) },
//     })

//     return NextResponse.json({ message: "Project deleted successfully" })
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
//   }
// })

import { type NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number.parseInt(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        title: true,
        description: true,
        longDescription: true,
        price: true,
        runningCost: true,
        category: true,
        tech: true,
        features: true,
        complexity: true,
        setupTime: true,
        images: true,
        demoUrl: true,
        techSpecs: true,
        requirements: true,
        included: true,
        workflow: true,
        status: true,
        sales: true,
        revenue: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(
  async (
    req: NextRequest,
    user: any,
    { params }: { params: { id: string } }
  ) => {
    try {
      const projectId = Number.parseInt(params.id);

      if (isNaN(projectId)) {
        return NextResponse.json(
          { error: "Invalid project ID" },
          { status: 400 }
        );
      }

      const data = await req.json();

      // Validate required fields
      if (
        !data.title ||
        !data.description ||
        !data.price ||
        !data.runningCost ||
        !data.category
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: data.title,
          description: data.description,
          longDescription: data.longDescription || null,
          price: Number.parseInt(data.price.toString()),
          runningCost: Number.parseInt(data.runningCost.toString()),
          category: data.category,
          tech: Array.isArray(data.tech)
            ? data.tech
            : data.tech
                ?.split(",")
                .map((t: string) => t.trim())
                .filter((t: string) => t) || [],
          features: Array.isArray(data.features)
            ? data.features
            : data.features
                ?.split(",")
                .map((f: string) => f.trim())
                .filter((f: string) => f) || [],
          complexity: data.complexity || "Intermediate",
          setupTime: data.setupTime || "1-2 days",
          images: data.images || [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
          ],
          demoUrl: data.demoUrl || null,
          techSpecs: data.techSpecs
            ? {
                frontend: data.techSpecs.frontend || "",
                backend: data.techSpecs.backend || "",
                database: data.techSpecs.database || "",
                authentication: data.techSpecs.authentication || "",
                payments: data.techSpecs.payments || "",
                deployment: data.techSpecs.deployment || "",
              }
            : undefined,
          requirements: data.requirements
            ? {
                server: data.requirements.server || "",
                database: data.requirements.database || "",
                storage: data.requirements.storage || "",
                bandwidth: data.requirements.bandwidth || "",
              }
            : undefined,
          included: Array.isArray(data.included)
            ? data.included
            : data.included
                ?.split(",")
                .map((i: string) => i.trim())
                .filter((i: string) => i) || [],
          workflow: Array.isArray(data.workflow)
            ? data.workflow
            : data.workflow
                ?.split(",")
                .map((w: string) => w.trim())
                .filter((w: string) => w) || [],
          status: data.status || "draft",
          sales: Number.parseInt(data.sales?.toString() || "0"),
          revenue: Number.parseInt(data.revenue?.toString() || "0"),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = withAuth(
  async (
    req: NextRequest,
    user: any,
    { params }: { params: { id: string } }
  ) => {
    try {
      const projectId = Number.parseInt(params.id);

      if (isNaN(projectId)) {
        return NextResponse.json(
          { error: "Invalid project ID" },
          { status: 400 }
        );
      }

      await prisma.project.delete({
        where: { id: projectId },
      });

      return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      );
    }
  }
);
