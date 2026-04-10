import { NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

const MAX_AMOUNT = 1e15

function toMillis(value: unknown): number {
  if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
    return (value as { toMillis: () => number }).toMillis()
  }
  return 0
}

/** Public donor table: only rows with showInReport === true */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('report') !== '1') {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  }

  const db = getAdminDb()
  if (!db) {
    return NextResponse.json({ ok: false, error: 'missing_service_account' }, { status: 503 })
  }

  try {
    const snap = await db.collection('donations').get()
    const rows = snap.docs
      .map((doc) => {
        const d = doc.data()
        const show = d.showInReport === true
        if (!show) return null
        return {
          id: doc.id,
          name: String(d.name ?? 'Anonymous'),
          type: String(d.donatorType ?? d.type ?? 'Free Donator'),
          amount: Number(d.amount ?? 0),
          rank: String(d.rank ?? 'None'),
          _sort: toMillis(d.createdAt),
        }
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)
    rows.sort((a, b) => b._sort - a._sort)
    const donations = rows.map(({ _sort, ...rest }) => {
      void _sort
      return rest
    })
    return NextResponse.json({ ok: true, donations })
  } catch (e) {
    console.error('[api/donations GET report]', e)
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
  const nameRaw = typeof b.name === 'string' ? b.name.trim() : ''
  const name = nameRaw || 'Anonymous'
  const amount = typeof b.amount === 'number' ? b.amount : Number(b.amount)
  const message = typeof b.message === 'string' ? b.message.trim() : ''
  const donatorType = typeof b.donatorType === 'string' ? b.donatorType.trim() : 'Free Donator'
  const rank = typeof b.rank === 'string' ? b.rank.trim() : 'None'
  const source = b.source === 'tier' || b.source === 'hero' ? b.source : 'hero'
  const paymentProofUrl = typeof b.paymentProofUrl === 'string' ? b.paymentProofUrl.trim() : ''

  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_AMOUNT) {
    return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 })
  }

  try {
    const ref = await db.collection('donations').add({
      name,
      amount,
      message,
      donatorType,
      rank,
      source,
      paymentProofUrl: paymentProofUrl || '',
      showInReport: false,
      createdAt: FieldValue.serverTimestamp(),
    })
    return NextResponse.json({ ok: true, id: ref.id })
  } catch (e) {
    console.error('[api/donations POST]', e)
    return NextResponse.json({ ok: false, error: 'firestore_failed' }, { status: 500 })
  }
}
