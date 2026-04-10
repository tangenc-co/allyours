'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { listDonationsAdmin, setDonationShowInReport, type AdminDonationRow } from '@/app/actions/donations-admin'

export default function AdminDonationsPage() {
  const [rows, setRows] = useState<AdminDonationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await listDonationsAdmin()
    if (!res.ok) {
      setError(res.error === 'missing_service_account' ? 'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local' : res.error)
      setRows([])
    } else {
      setRows(res.donations)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function onToggle(row: AdminDonationRow, checked: boolean) {
    setPendingId(row.id)
    const res = await setDonationShowInReport(row.id, checked)
    setPendingId(null)
    if (!res.ok) {
      setError(res.error)
      return
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, showInReport: checked } : r)))
  }

  return (
    <div className='min-h-screen max-w-5xl mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Donations</h1>
      <p className='text-sm text-[#444] mb-6 leading-relaxed'>
        Toggle <strong>Show in donor report</strong> to include a row in the public table on Support Us. New donations from the site
        start hidden until you enable them here.
      </p>

      <div className='flex gap-4 mb-8 text-sm'>
        <button type='button' onClick={() => load()} className='text-[#005CFF] underline'>
          Refresh
        </button>
        <Link href='/support-us' className='text-[#005CFF] underline'>
          View Support Us
        </Link>
        <Link href='/admin/members' className='text-[#005CFF] underline'>
          Members
        </Link>
        <Link href='/admin/podcasts' className='text-[#AA16FF] underline'>
          Podcasts
        </Link>
      </div>

      {loading ? <p className='text-[#444]'>Loading…</p> : null}
      {error ? <p className='text-red-600 text-sm mb-4'>{error}</p> : null}

      {!loading && rows.length === 0 && !error ? (
        <p className='text-[#444] text-sm'>No donation documents yet.</p>
      ) : null}

      {!loading && rows.length > 0 ? (
        <div className='overflow-x-auto border border-gray-200 rounded-lg'>
          <table className='min-w-[800px] w-full text-sm'>
            <thead className='bg-[#f5f5f5] text-left'>
              <tr>
                <th className='p-3 font-medium'>Show in report</th>
                <th className='p-3 font-medium'>Name</th>
                <th className='p-3 font-medium'>Amount (Ks)</th>
                <th className='p-3 font-medium'>Type</th>
                <th className='p-3 font-medium'>Rank</th>
                <th className='p-3 font-medium'>Source</th>
                <th className='p-3 font-medium'>Proof</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className='border-t border-gray-100'>
                  <td className='p-3'>
                    <Switch
                      checked={r.showInReport}
                      disabled={pendingId === r.id}
                      onCheckedChange={(c) => onToggle(r, c)}
                    />
                  </td>
                  <td className='p-3'>{r.name}</td>
                  <td className='p-3'>{r.amount.toLocaleString()}</td>
                  <td className='p-3'>{r.donatorType}</td>
                  <td className='p-3'>{r.rank}</td>
                  <td className='p-3'>{r.source || '—'}</td>
                  <td className='p-3'>
                    {r.paymentProofUrl ? (
                      <a href={r.paymentProofUrl} target='_blank' rel='noopener noreferrer' className='text-[#005CFF] underline'>
                        View
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <p className='mt-10 text-xs text-[#888]'>Admin pages require Firebase sign-in.</p>
    </div>
  )
}
