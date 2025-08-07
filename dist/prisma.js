import { PrismaClient } from "@prisma/client";
import env from 'dotenv';
env.config();
console.log('conn string', process.env.Database_URL);
let prisma = new PrismaClient();
export default prisma;
