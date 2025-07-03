import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

// Define a more flexible type for the global prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

// Create a new PrismaClient if one doesn't exist in the global scope
const prismaBase = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Extend the PrismaClient with Accelerate
export const prisma = prismaBase.$extends(withAccelerate());

// Save the client instance to avoid multiple instances in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaBase;
