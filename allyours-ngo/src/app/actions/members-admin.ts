'use server'

import { getAdminDb } from '@/lib/firebase-admin'
import { revalidatePath } from 'next/cache'

function toMillis(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
    return (value as { toMillis: () => number }).toMillis()
  }
  return 0
}

export type AdminMemberRow = {
  id: string
  name: string
  role: string
  url: string
  imageUrl: string
  createdAtMs: number
}

export async function listMembersAdmin(): Promise<{ ok: true; members: AdminMemberRow[] } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }

  try {
    const snap = await db.collection('members').get()
    const rows = snap.docs.map((doc) => {
      const d = doc.data()
      const img = d.imageUrl ?? d.image
      return {
        id: doc.id,
        name: String(d.name ?? ''),
        role: String(d.role ?? ''),
        url: String(d.url ?? d.link ?? ''),
        imageUrl: typeof img === 'string' ? img : '',
        createdAtMs: toMillis(d.createdAt),
      }
    })
    rows.sort((a, b) => a.createdAtMs - b.createdAtMs)
    return { ok: true, members: rows }
  } catch (e) {
    console.error('[listMembersAdmin]', e)
    return { ok: false, error: 'firestore_failed' }
  }
}

export async function updateMemberAdmin(
  id: string,
  input: { name: string; role: string; url: string; imageUrl: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }
  const name = input.name.trim()
  const role = input.role.trim()
  if (!name || !role) return { ok: false, error: 'name_and_role_required' }
  const url = input.url.trim()
  const imageUrl = input.imageUrl.trim()
  if (imageUrl && !imageUrl.startsWith('http')) return { ok: false, error: 'invalid_image_url' }

  try {
    await db.collection('members').doc(id).update({
      name,
      role,
      url: url || '',
      imageUrl: imageUrl || '',
    })
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    console.error('[updateMemberAdmin]', e)
    return { ok: false, error: 'update_failed' }
  }
}

export async function deleteMemberAdmin(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }
  if (!id.trim()) return { ok: false, error: 'invalid_id' }

  try {
    await db.collection('members').doc(id).delete()
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    console.error('[deleteMemberAdmin]', e)
    return { ok: false, error: 'delete_failed' }
  }
}
