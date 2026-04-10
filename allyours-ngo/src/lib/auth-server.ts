import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/auth-cookie'
import { getAdminAuth } from '@/lib/firebase-admin'
import type { DecodedIdToken } from 'firebase-admin/auth'

export async function getSessionUser(): Promise<DecodedIdToken | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
  if (!session) return null
  const auth = getAdminAuth()
  if (!auth) return null
  try {
    return await auth.verifySessionCookie(session, true)
  } catch {
    return null
  }
}

export function safeAdminNextPath(next: string | null | undefined): string {
  if (!next || typeof next !== 'string') return '/admin'
  const t = next.trim()
  if (!t.startsWith('/') || t.startsWith('//')) return '/admin'
  if (!t.startsWith('/admin')) return '/admin'
  if (t.startsWith('/admin/login') || t.startsWith('/admin/sign-up')) return '/admin'
  return t
}

/** Call from protected admin layout when session is missing or invalid. */
export async function redirectToAdminLogin(): Promise<never> {
  const h = await headers()
  const pathname = h.get('x-admin-pathname')?.trim() || '/admin'
  const next = pathname.startsWith('/admin') ? pathname : '/admin'
  redirect(`/admin/login?next=${encodeURIComponent(next)}`)
}
