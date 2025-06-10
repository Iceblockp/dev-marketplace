import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await authenticateUser(email, password)
    const token = generateToken(user.id, user.email)

    const response = NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email } },
      { status: 200 },
    )

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 })
  }
}
