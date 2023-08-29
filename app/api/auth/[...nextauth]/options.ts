import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Your Email",
                },
                password: {
                    label: "Password:",
                    type: "password",
                }
            },
            async authorize(credentials) {
                //validation for user with credentials
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.users.findUnique({
                    where: { email: credentials.email }
                })
                if (!user) {
                    return null;
                }

                const passwordValidation = credentials.password === user.password
                if (!passwordValidation) {
                    return null;
                }

                return {
                    id: user.id + '',
                    email: user.email,
                    name: user.name,
                }
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                }
            }
            return token
        }
    }
}