import nextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return ({
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
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
            session.user.role = token.role;
            return session;
        }
    }
}

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST }