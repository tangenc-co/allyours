import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/auth-cookie'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/admin/sign-up') {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-admin-pathname', pathname + search)

  if (!request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value) {
    const login = new URL('/admin/login', request.url)
    login.searchParams.set('next', pathname + search)
    return NextResponse.redirect(login)
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
