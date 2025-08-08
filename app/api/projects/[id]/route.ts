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
        shortDescription: true,
        longDescription: true,
        customizable: true,
        estimatedCustomPrice: true,
        estimatedDuration: true,
        businessAdvantages: true,
        useCases: true,
        tags: true,
        targetAudience: true,
        businessTypes: true,
        coverImage: true,
        galleryImages: true,
        videoDemoUrl: true,
        availability: true,
        viewsCount: true,
        price: true,
        category: true,
        status: true,
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
        !data.shortDescription ||
        !data.longDescription ||
        !data.category
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      // Process arrays
      const businessAdvantages = Array.isArray(data.businessAdvantages)
        ? data.businessAdvantages
        : data.businessAdvantages
        ? data.businessAdvantages.split(",").map((item: string) => item.trim())
        : [];

      const useCases = Array.isArray(data.useCases)
        ? data.useCases
        : data.useCases
        ? data.useCases.split(",").map((item: string) => item.trim())
        : [];

      const tags = Array.isArray(data.tags)
        ? data.tags
        : data.tags
        ? data.tags.split(",").map((item: string) => item.trim())
        : [];

      const targetAudience = Array.isArray(data.targetAudience)
        ? data.targetAudience
        : data.targetAudience
        ? data.targetAudience.split(",").map((item: string) => item.trim())
        : [];

      const businessTypes = Array.isArray(data.businessTypes)
        ? data.businessTypes
        : data.businessTypes
        ? data.businessTypes.split(",").map((item: string) => item.trim())
        : [];

      const galleryImages = Array.isArray(data.galleryImages)
        ? data.galleryImages
        : data.galleryImages
        ? data.galleryImages.split(",").map((item: string) => item.trim())
        : [];

      // Update the project
      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: data.title,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          category: data.category,
          status: data.status || "ready",
          customizable: data.customizable || "partial",
          price: data.price ? parseInt(data.price.toString()) : null,
          estimatedCustomPrice: data.estimatedCustomPrice
            ? parseInt(data.estimatedCustomPrice.toString())
            : null,
          estimatedDuration: data.estimatedDuration || null,
          businessAdvantages,
          useCases,
          tags,
          targetAudience,
          businessTypes,
          coverImage: data.coverImage || null,
          galleryImages,
          videoDemoUrl: data.videoDemoUrl || null,
          availability:
            data.availability !== undefined ? data.availability : true,
          viewsCount:
            data.viewsCount !== undefined
              ? parseInt(data.viewsCount.toString())
              : undefined,
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
