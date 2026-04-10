import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/auth-cookie'
import { getAdminAuth } from '@/lib/firebase-admin'

export async function POST() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
  const auth = getAdminAuth()

  if (session && auth) {
    try {
      const decoded = await auth.verifySessionCookie(session, false)
      await auth.revokeRefreshTokens(decoded.sub)
    } catch {
      /* ignore — still clear cookie */
    }
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME)

  return NextResponse.json({ ok: true })
}
