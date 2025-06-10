import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware"
import { prisma } from "@/lib/prisma"

export const PUT = withAuth(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    const data = await req.json()

    const inquiry = await prisma.inquiry.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        status: data.status,
        lastContact: data.status === "contacted" ? new Date() : undefined,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
})
