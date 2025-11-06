import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          
          // For demo purposes, using a simple admin check
          // In production, you should hash passwords
          if (email === "admin@zenware.ai" && password === "zenware123") {
            return {
              id: "1",
              name: "Admin",
              email: "admin@zenware.ai",
              role: "admin"
            }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnAdminLogin = nextUrl.pathname === '/admin/login'

      if (isOnAdmin && !isOnAdminLogin) {
        return isLoggedIn
      }

      return true
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    session: ({ session, token }) => {
      if (token.role) {
        (session.user as any).role = token.role
      }
      return session
    },
  },
})