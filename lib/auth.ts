import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE!;

export async function createAdminUser(
  email: string,
  password: string,
  secretCode: string
) {
  // Verify secret code
  if (secretCode !== ADMIN_SECRET_CODE) {
    throw new Error("Invalid secret code");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "admin",
    },
  });

  return { id: user.id, email: user.email, role: user.role };
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id, email: user.email, role: user.role };
}

export function generateToken(userId: number, email: string) {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { id: user.id, email: user.email, role: user.role };
}
