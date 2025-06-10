import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        projectType: data.projectType,
        budget: data.budget,
        message: data.message,
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}
