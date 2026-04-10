import { NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

function normalizeImageUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null
  const v = value.trim()
  return v.startsWith('http') ? v : null
}

function toMillis(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
    return (value as { toMillis: () => number }).toMillis()
  }
  return 0
}

export async function GET() {
  const db = getAdminDb()
  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_service_account',
        message:
          'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local (server-only JSON from Firebase → Service accounts).',
      },
      { status: 503 },
    )
  }

  try {
    const snap = await db.collection('members').get()
    const withSort = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        name: String(d.name ?? ''),
        role: String(d.role ?? ''),
        link: String(d.url ?? d.link ?? ''),
        imageUrl: normalizeImageUrl(d.imageUrl ?? d.image),
        _sort: toMillis(d.createdAt),
      }
    })
    withSort.sort((a, b) => a._sort - b._sort)
    const members = withSort.map((row) => {
      const { _sort, ...rest } = row
      void _sort
      return rest
    })
    return NextResponse.json({ ok: true, members })
  } catch (e) {
    console.error('[api/members]', e)
    return NextResponse.json({ ok: false, error: 'firestore_failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const db = getAdminDb()
  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_service_account',
        message: 'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local.',
      },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const name = typeof b.name === 'string' ? b.name.trim() : ''
  const role = typeof b.role === 'string' ? b.role.trim() : ''
  const url = typeof b.url === 'string' ? b.url.trim() : ''
  const imageUrlRaw = typeof b.imageUrl === 'string' ? b.imageUrl.trim() : ''

  if (!name || !role) {
    return NextResponse.json({ ok: false, error: 'name_and_role_required' }, { status: 400 })
  }

  if (imageUrlRaw && !imageUrlRaw.startsWith('http')) {
    return NextResponse.json({ ok: false, error: 'imageUrl_must_be_http_url' }, { status: 400 })
  }

  try {
    const ref = await db.collection('members').add({
      name,
      role,
      url: url || '',
      imageUrl: imageUrlRaw || '',
      createdAt: FieldValue.serverTimestamp(),
    })
    return NextResponse.json({ ok: true, id: ref.id })
  } catch (e) {
    console.error('[api/members POST]', e)
    return NextResponse.json({ ok: false, error: 'firestore_failed' }, { status: 500 })
  }
}
