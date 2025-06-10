import { type NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "./auth"

export function withAuth(handler: (req: NextRequest, user: any, ...args: any[]) => Promise<NextResponse>) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const token = req.cookies.get("auth-token")?.value

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const user = await getUserFromToken(token)
      return handler(req, user, ...args)
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }
}
