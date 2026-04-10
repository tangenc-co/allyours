'use server'

import { getAdminDb } from '@/lib/firebase-admin'
import { revalidatePath } from 'next/cache'

function toMillis(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
    return (value as { toMillis: () => number }).toMillis()
  }
  return 0
}

export type AdminDonationRow = {
  id: string
  name: string
  amount: number
  donatorType: string
  rank: string
  source: string
  message: string
  paymentProofUrl: string
  showInReport: boolean
  createdAtMs: number
}

export async function listDonationsAdmin(): Promise<{ ok: true; donations: AdminDonationRow[] } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }

  try {
    const snap = await db.collection('donations').get()
    const rows = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        name: String(d.name ?? 'Anonymous'),
        amount: Number(d.amount ?? 0),
        donatorType: String(d.donatorType ?? d.type ?? 'Free Donator'),
        rank: String(d.rank ?? 'None'),
        source: String(d.source ?? ''),
        message: String(d.message ?? ''),
        paymentProofUrl: String(d.paymentProofUrl ?? ''),
        showInReport: d.showInReport === true,
        createdAtMs: toMillis(d.createdAt),
      }
    })
    rows.sort((a, b) => b.createdAtMs - a.createdAtMs)
    return { ok: true, donations: rows }
  } catch (e) {
    console.error('[listDonationsAdmin]', e)
    return { ok: false, error: 'firestore_failed' }
  }
}

export async function setDonationShowInReport(
  donationId: string,
  showInReport: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getAdminDb()
  if (!db) return { ok: false, error: 'missing_service_account' }
  if (!donationId.trim()) return { ok: false, error: 'invalid_id' }

  try {
    await db.collection('donations').doc(donationId).update({ showInReport })
    revalidatePath('/support-us')
    return { ok: true }
  } catch (e) {
    console.error('[setDonationShowInReport]', e)
    return { ok: false, error: 'update_failed' }
  }
}
