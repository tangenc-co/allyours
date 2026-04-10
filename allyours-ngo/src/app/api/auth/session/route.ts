import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SEC,
} from '@/lib/auth-cookie'
import { getAdminAuth } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  const auth = getAdminAuth()
  if (!auth) {
    return NextResponse.json({ ok: false, error: 'server_auth_unconfigured' }, { status: 503 })
  }

  let idToken: string
  try {
    const body = (await request.json()) as { idToken?: string }
    idToken = typeof body.idToken === 'string' ? body.idToken.trim() : ''
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (!idToken) {
    return NextResponse.json({ ok: false, error: 'idToken_required' }, { status: 400 })
  }

  try {
    await auth.verifyIdToken(idToken)
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_id_token' }, { status: 401 })
  }

  const expiresInMs = ADMIN_SESSION_MAX_AGE_SEC * 1000
  let sessionCookie: string
  try {
    sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: expiresInMs })
  } catch (e) {
    console.error('[auth/session] createSessionCookie', e)
    return NextResponse.json({ ok: false, error: 'session_create_failed' }, { status: 500 })
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  })

  return NextResponse.json({ ok: true })
}
