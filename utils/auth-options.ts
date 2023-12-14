import { AuthOptions } from "next-auth"
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export const authOptions: AuthOptions = {
    debug: true,
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && compareSync(credentials.password, user.password)) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: user.role
                    };
                }

                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                const salt = genSaltSync(10);
                const hash = hashSync(Math.random().toString(36).slice(-8), salt);
                return ({
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    password: hash,
                    image: profile.picture,
                    role: profile.role ? profile.role : "user"
                })
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            if (token.role) {
                session.user.role = token.role;
            }
            session.user.role = token.role;
            return session;
        }
    }
}