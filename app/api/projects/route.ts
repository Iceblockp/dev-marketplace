import { type NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const data = await req.json();

    // Validate required fields
    if (
      !data.title ||
      !data.shortDescription ||
      !data.longDescription ||
      !data.category
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, shortDescription, longDescription, category",
        },
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

    // Create the project
    const project = await prisma.project.create({
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
        viewsCount: 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
});
