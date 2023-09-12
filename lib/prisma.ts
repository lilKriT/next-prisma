import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] }); // this will make it log every query

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
