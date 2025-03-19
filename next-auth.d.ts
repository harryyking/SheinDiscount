import NextAuth, { DefaultUser, User, type DefaultSession } from "next-auth";
import { JWT } from 'next-auth/jwt'

declare module "next-auth" {
    interface Session {
        user: {
            id: string;  // Add the id field
            email: string;
            name: string;
            image?: string;
        }
    }
}