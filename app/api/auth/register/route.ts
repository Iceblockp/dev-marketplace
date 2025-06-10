import { type NextRequest, NextResponse } from "next/server"
import { createAdminUser, generateToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretCode } = await req.json()

    if (!email || !password || !secretCode) {
      return NextResponse.json({ error: "Email, password, and secret code are required" }, { status: 400 })
    }

    const user = await createAdminUser(email, password, secretCode)
    const token = generateToken(user.id, user.email)

    const response = NextResponse.json(
      { message: "Admin account created successfully", user: { id: user.id, email: user.email } },
      { status: 201 },
    )

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 400 })
  }
}
