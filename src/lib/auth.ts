import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
              throw new Error("Error al enviar los datos");
            }
            
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email,
                },
            });  
            
            if (!user || !(await compare(credentials.password, user.password))) {
              return null;
            }
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            randomKey:"ok"
          };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
     async redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return `/`
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  }
  },
  
  pages:{
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET
};