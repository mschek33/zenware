import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = (req.auth?.user as any)?.role

  // Admin routes protection (except login page)
  if (nextUrl.pathname.startsWith('/admin') && nextUrl.pathname !== '/admin/login') {
    if (!isLoggedIn || userRole !== 'admin') {
      return Response.redirect(new URL('/admin/login', nextUrl.origin))
    }
  }

  // Affiliate routes protection (except login page)
  if (nextUrl.pathname.startsWith('/affiliate') && nextUrl.pathname !== '/affiliate/login') {
    if (!isLoggedIn || userRole !== 'affiliate') {
      return Response.redirect(new URL('/affiliate/login', nextUrl.origin))
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
