'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  deletePodcastAdmin,
  listPodcastsAdmin,
  updatePodcastAdmin,
  type AdminPodcastRow,
} from '@/app/actions/podcasts-admin'
import { uploadImageToCloudinary } from '@/services/cloudinary'

function errorMessage(code: string): string {
  const map: Record<string, string> = {
    missing_service_account: 'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local',
    firestore_failed: 'Could not load podcasts from Firestore.',
    title_hostname_duration_required: 'Title, host name, and duration are required.',
    youtubeUrl_must_be_youtube_http_url: 'YouTube URL must be a valid http(s) YouTube link.',
    invalid_thumbnail: 'Thumbnail must be a valid http(s) URL.',
    update_failed: 'Update failed.',
    delete_failed: 'Delete failed.',
    invalid_id: 'Invalid podcast id.',
  }
  return map[code] ?? code
}

export default function AdminPodcastsListPage() {
  const [rows, setRows] = useState<AdminPodcastRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editRow, setEditRow] = useState<AdminPodcastRow | null>(null)
  const [title, setTitle] = useState('')
  const [hostname, setHostname] = useState('')
  const [duration, setDuration] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [thumbnailInput, setThumbnailInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await listPodcastsAdmin()
    if (!res.ok) {
      setError(errorMessage(res.error))
      setRows([])
    } else {
      setRows(res.podcasts)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function openEdit(row: AdminPodcastRow) {
    setEditRow(row)
    setTitle(row.title)
    setHostname(row.hostname)
    setDuration(row.duration)
    setYoutubeUrl(row.youtubeUrl)
    setThumbnailInput(row.thumbnail)
    setFile(null)
    setEditOpen(true)
  }

  function closeEdit() {
    setEditOpen(false)
    setEditRow(null)
    setFile(null)
  }

  async function onSaveEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editRow) return
    setSaving(true)
    setError(null)
    try {
      let thumbnail = thumbnailInput.trim()
      if (file) {
        thumbnail = await uploadImageToCloudinary(file)
      }
      const res = await updatePodcastAdmin(editRow.id, {
        title: title.trim(),
        hostname: hostname.trim(),
        duration: duration.trim(),
        youtubeUrl: youtubeUrl.trim(),
        thumbnail,
      })
      if (!res.ok) {
        setError(errorMessage(res.error))
        setSaving(false)
        return
      }
      closeEdit()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    }
    setSaving(false)
  }

  async function onDelete(row: AdminPodcastRow) {
    if (!window.confirm(`Delete episode “${row.title}”? This cannot be undone.`)) return
    setDeletingId(row.id)
    setError(null)
    const res = await deletePodcastAdmin(row.id)
    setDeletingId(null)
    if (!res.ok) {
      setError(errorMessage(res.error))
      return
    }
    await load()
  }

  return (
    <div className='min-h-screen max-w-5xl mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Podcast episodes</h1>
      <p className='text-sm text-[#444] mb-6 leading-relaxed'>
        Edit or remove episodes shown in Section 4 on the homepage.
      </p>

      <div className='flex flex-wrap gap-4 mb-8 text-sm'>
        <button type='button' onClick={() => load()} className='text-[#AA16FF] underline'>
          Refresh
        </button>
        <Link href='/admin/podcasts/new' className='text-[#AA16FF] underline'>
          Add episode
        </Link>
        <Link href='/admin/members' className='text-[#005CFF] underline'>
          Members
        </Link>
        <Link href='/admin/donations' className='text-[#005CFF] underline'>
          Donations
        </Link>
        <Link href='/' className='text-[#005CFF] underline'>
          Homepage
        </Link>
      </div>

      {loading ? <p className='text-[#444]'>Loading…</p> : null}
      {error ? <p className='text-red-600 text-sm mb-4'>{error}</p> : null}

      {!loading && rows.length === 0 && !error ? (
        <p className='text-[#444] text-sm'>No podcast episodes yet.</p>
      ) : null}

      {!loading && rows.length > 0 ? (
        <div className='overflow-x-auto border border-gray-200 rounded-lg'>
          <table className='min-w-[800px] w-full text-sm'>
            <thead className='bg-[#f5f5f5] text-left'>
              <tr>
                <th className='p-3 font-medium'>Thumb</th>
                <th className='p-3 font-medium'>Title</th>
                <th className='p-3 font-medium'>Host</th>
                <th className='p-3 font-medium'>Duration</th>
                <th className='p-3 font-medium'>YouTube</th>
                <th className='p-3 font-medium w-[140px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className='border-t border-gray-100'>
                  <td className='p-3'>
                    {r.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin may use any http(s) thumbnail host
                      <img
                        src={r.thumbnail}
                        alt=''
                        className='h-12 w-20 rounded object-cover bg-gray-100'
                      />
                    ) : (
                      <span className='text-[#888]'>—</span>
                    )}
                  </td>
                  <td className='p-3 max-w-[200px]'>{r.title}</td>
                  <td className='p-3'>{r.hostname}</td>
                  <td className='p-3'>{r.duration}</td>
                  <td className='p-3'>
                    {r.youtubeUrl ? (
                      <a href={r.youtubeUrl} target='_blank' rel='noopener noreferrer' className='text-[#AA16FF] underline'>
                        Open
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className='p-3'>
                    <div className='flex flex-wrap gap-2'>
                      <button type='button' onClick={() => openEdit(r)} className='text-[#AA16FF] underline'>
                        Edit
                      </button>
                      <button
                        type='button'
                        disabled={deletingId === r.id}
                        onClick={() => onDelete(r)}
                        className='text-red-600 underline disabled:opacity-50'
                      >
                        {deletingId === r.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <Dialog open={editOpen} onOpenChange={(o) => !o && closeEdit()}>
        <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Edit episode</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSaveEdit} className='flex flex-col gap-3 text-left'>
            <label className='flex flex-col gap-1 text-sm'>
              Episode title
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Host name
              <input
                type='text'
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Duration (display text)
              <input
                type='text'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              YouTube episode URL
              <input
                type='url'
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Thumbnail URL (optional if you upload below)
              <input
                type='url'
                value={thumbnailInput}
                onChange={(e) => setThumbnailInput(e.target.value)}
                disabled={Boolean(file)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-base disabled:opacity-50'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Or replace thumbnail (Cloudinary)
              <input
                type='file'
                accept='image/*'
                disabled={Boolean(thumbnailInput.trim())}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className='text-sm disabled:opacity-50'
              />
            </label>
            <DialogFooter className='pt-4'>
              <button
                type='button'
                onClick={closeEdit}
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={saving}
                className='rounded-lg bg-[#AA16FF] px-4 py-2 text-sm font-medium text-white disabled:opacity-60'
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <p className='mt-10 text-xs text-[#888]'>Admin pages require Firebase sign-in.</p>
    </div>
  )
}
