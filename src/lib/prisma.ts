import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => { 
    return new PrismaClient();
}

/**
 * Declares a global object that extends the existing global object with a `prismaGlobal` property.
 * 
 * @property {ReturnType<typeof prismaClientSingleton>} prismaGlobal - An instance of the Prisma client singleton.
 * 
 * This declaration ensures that the Prisma client instance is globally accessible,
 * preventing multiple instances of the Prisma client from being created.
 */
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;