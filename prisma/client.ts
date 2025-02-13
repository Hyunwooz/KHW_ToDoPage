import { PrismaClient } from '@prisma/client';

// Prisma 인스턴스가 여러 번 생성되는 것 방지
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
