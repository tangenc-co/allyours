import { NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim())
}

function isYouTubeish(s: string): boolean {
  const u = s.toLowerCase()
  return u.includes('youtube.com') || u.includes('youtu.be')
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
        message: 'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local.',
      },
      { status: 503 },
    )
  }

  try {
    const snap = await db.collection('podcasts').get()
    const withSort = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        title: String(d.title ?? ''),
        hostname: String(d.hostname ?? d.hostName ?? ''),
        duration: String(d.duration ?? ''),
        thumbnail: String(d.thumbnail ?? ''),
        youtubeUrl: String(d.youtubeUrl ?? d.youtube_url ?? ''),
        _sort: toMillis(d.createdAt),
      }
    })
    withSort.sort((a, b) => b._sort - a._sort)
    const podcasts = withSort.map((row) => {
      const { _sort, ...rest } = row
      void _sort
      return rest
    })
    return NextResponse.json({ ok: true, podcasts })
  } catch (e) {
    console.error('[api/podcasts GET]', e)
    return NextResponse.json({ ok: false, error: 'firestore_failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const db = getAdminDb()
  if (!db) {
    return NextResponse.json({ ok: false, error: 'missing_service_account' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const title = typeof b.title === 'string' ? b.title.trim() : ''
  const hostname = typeof b.hostname === 'string' ? b.hostname.trim() : ''
  const duration = typeof b.duration === 'string' ? b.duration.trim() : ''
  const thumbnail = typeof b.thumbnail === 'string' ? b.thumbnail.trim() : ''
  const youtubeUrl = typeof b.youtubeUrl === 'string' ? b.youtubeUrl.trim() : ''

  if (!title || !hostname || !duration) {
    return NextResponse.json({ ok: false, error: 'title_hostname_duration_required' }, { status: 400 })
  }
  if (!youtubeUrl || !isHttpUrl(youtubeUrl) || !isYouTubeish(youtubeUrl)) {
    return NextResponse.json({ ok: false, error: 'youtubeUrl_must_be_youtube_http_url' }, { status: 400 })
  }
  if (thumbnail && !isHttpUrl(thumbnail)) {
    return NextResponse.json({ ok: false, error: 'thumbnail_must_be_http_url' }, { status: 400 })
  }

  try {
    const ref = await db.collection('podcasts').add({
      title,
      hostname,
      duration,
      thumbnail: thumbnail || '',
      youtubeUrl,
      createdAt: FieldValue.serverTimestamp(),
    })
    return NextResponse.json({ ok: true, id: ref.id })
  } catch (e) {
    console.error('[api/podcasts POST]', e)
    return NextResponse.json({ ok: false, error: 'firestore_failed' }, { status: 500 })
  }
}
