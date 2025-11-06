import { auth } from "./auth"
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    const newUrl = new URL('/admin/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}