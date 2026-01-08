import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "text" }
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            loginType: z.enum(['admin', 'affiliate']).optional().default('admin')
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password, loginType } = parsedCredentials.data

          // Admin login
          if (loginType === 'admin') {
            if (email === "admin@zenware.ai" && password === "zenware123") {
              return {
                id: "1",
                name: "Admin",
                email: "admin@zenware.ai",
                role: "admin"
              }
            }
          }

          // Affiliate login
          if (loginType === 'affiliate') {
            const affiliate = await prisma.affiliate.findUnique({
              where: { email }
            })

            if (affiliate && affiliate.isActive) {
              const passwordMatch = await bcrypt.compare(password, affiliate.password)
              if (passwordMatch) {
                // Update last login
                await prisma.affiliate.update({
                  where: { id: affiliate.id },
                  data: { lastLoginAt: new Date() }
                })

                return {
                  id: affiliate.id,
                  name: affiliate.name,
                  email: affiliate.email,
                  role: "affiliate",
                  referralCode: affiliate.referralCode
                }
              }
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
      const userRole = (auth?.user as any)?.role
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnAffiliate = nextUrl.pathname.startsWith('/affiliate')
      const isOnAdminLogin = nextUrl.pathname === '/admin/login'
      const isOnAffiliateLogin = nextUrl.pathname === '/affiliate/login'

      // Admin routes protection (except login page)
      if (isOnAdmin && !isOnAdminLogin) {
        if (!isLoggedIn) return false
        return userRole === 'admin'
      }

      // Affiliate routes protection (except login page)
      if (isOnAffiliate && !isOnAffiliateLogin) {
        if (!isLoggedIn) return false
        return userRole === 'affiliate'
      }

      return true
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = (user as any).role
        token.referralCode = (user as any).referralCode
      }
      return token
    },
    session: ({ session, token }) => {
      if (token.role) {
        (session.user as any).role = token.role
      }
      if (token.referralCode) {
        (session.user as any).referralCode = token.referralCode
      }
      return session
    },
  },
})
