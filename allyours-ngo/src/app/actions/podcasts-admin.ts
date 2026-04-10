'use server'

import { getAdminDb } from '@/lib/firebase-admin'
import { revalidatePath } from 'next/cache'

function toMillis(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
    return (value as { toMillis: () => number }).toMillis()
  }
  return 0
}

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim())
}

function isYouTubeish(s: string): boolean {
  const u = s.toLowerCase()
  return u.includes('youtube.com') || u.includes('youtu.be')
}

export type AdminPodcastRow = {
  id: string
  title: string
  hostname: string
  duration: string
  thumbnail: string
  youtubeUrl: string
  createdAtMs: number
}

export async function listPodcastsAdmin(): Promise<{ ok: true; podcasts: AdminPodcastRow[] } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }

  try {
    const snap = await db.collection('podcasts').get()
    const rows = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        title: String(d.title ?? ''),
        hostname: String(d.hostname ?? d.hostName ?? ''),
        duration: String(d.duration ?? ''),
        thumbnail: String(d.thumbnail ?? ''),
        youtubeUrl: String(d.youtubeUrl ?? d.youtube_url ?? ''),
        createdAtMs: toMillis(d.createdAt),
      }
    })
    rows.sort((a, b) => b.createdAtMs - a.createdAtMs)
    return { ok: true, podcasts: rows }
  } catch (e) {
    console.error('[listPodcastsAdmin]', e)
    return { ok: false, error: 'firestore_failed' }
  }
}

export async function updatePodcastAdmin(
  id: string,
  input: { title: string; hostname: string; duration: string; youtubeUrl: string; thumbnail: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }

  const title = input.title.trim()
  const hostname = input.hostname.trim()
  const duration = input.duration.trim()
  const youtubeUrl = input.youtubeUrl.trim()
  const thumbnail = input.thumbnail.trim()

  if (!title || !hostname || !duration) return { ok: false, error: 'title_hostname_duration_required' }
  if (!youtubeUrl || !isHttpUrl(youtubeUrl) || !isYouTubeish(youtubeUrl)) {
    return { ok: false, error: 'youtubeUrl_must_be_youtube_http_url' }
  }
  if (thumbnail && !isHttpUrl(thumbnail)) return { ok: false, error: 'invalid_thumbnail' }

  try {
    await db.collection('podcasts').doc(id).update({
      title,
      hostname,
      duration,
      youtubeUrl,
      thumbnail: thumbnail || '',
    })
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    console.error('[updatePodcastAdmin]', e)
    return { ok: false, error: 'update_failed' }
  }
}

export async function deletePodcastAdmin(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }
  if (!id.trim()) return { ok: false, error: 'invalid_id' }

  try {
    await db.collection('podcasts').doc(id).delete()
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    console.error('[deletePodcastAdmin]', e)
    return { ok: false, error: 'delete_failed' }
  }
}
