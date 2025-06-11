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
      take: 3,
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
