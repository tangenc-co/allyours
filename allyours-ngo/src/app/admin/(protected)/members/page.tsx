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
  deleteMemberAdmin,
  listMembersAdmin,
  updateMemberAdmin,
  type AdminMemberRow,
} from '@/app/actions/members-admin'
import { uploadImageToCloudinary } from '@/services/cloudinary'

function errorMessage(code: string): string {
  const map: Record<string, string> = {
    missing_service_account: 'Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local',
    firestore_failed: 'Could not load members from Firestore.',
    name_and_role_required: 'Name and role are required.',
    invalid_image_url: 'Image URL must start with http(s).',
    update_failed: 'Update failed.',
    delete_failed: 'Delete failed.',
    invalid_id: 'Invalid member id.',
  }
  return map[code] ?? code
}

export default function AdminMembersListPage() {
  const [rows, setRows] = useState<AdminMemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editRow, setEditRow] = useState<AdminMemberRow | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await listMembersAdmin()
    if (!res.ok) {
      setError(errorMessage(res.error))
      setRows([])
    } else {
      setRows(res.members)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function openEdit(row: AdminMemberRow) {
    setEditRow(row)
    setName(row.name)
    setRole(row.role)
    setUrl(row.url)
    setImageUrlInput(row.imageUrl)
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
      let imageUrl = imageUrlInput.trim()
      if (file) {
        imageUrl = await uploadImageToCloudinary(file)
      }
      const res = await updateMemberAdmin(editRow.id, {
        name: name.trim(),
        role: role.trim(),
        url: url.trim(),
        imageUrl,
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

  async function onDelete(row: AdminMemberRow) {
    if (!window.confirm(`Delete member “${row.name}”? This cannot be undone.`)) return
    setDeletingId(row.id)
    setError(null)
    const res = await deleteMemberAdmin(row.id)
    setDeletingId(null)
    if (!res.ok) {
      setError(errorMessage(res.error))
      return
    }
    await load()
  }

  return (
    <div className='min-h-screen max-w-5xl mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Team members</h1>
      <p className='text-sm text-[#444] mb-6 leading-relaxed'>
        Edit or remove members shown on the homepage. Create new members from the add form.
      </p>

      <div className='flex flex-wrap gap-4 mb-8 text-sm'>
        <button type='button' onClick={() => load()} className='text-[#005CFF] underline'>
          Refresh
        </button>
        <Link href='/admin/members/new' className='text-[#005CFF] underline'>
          Add member
        </Link>
        <Link href='/admin/member-image' className='text-[#005CFF] underline'>
          Photo only (by ID)
        </Link>
        <Link href='/admin/podcasts' className='text-[#AA16FF] underline'>
          Podcasts
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
        <p className='text-[#444] text-sm'>No members yet.</p>
      ) : null}

      {!loading && rows.length > 0 ? (
        <div className='overflow-x-auto border border-gray-200 rounded-lg'>
          <table className='min-w-[720px] w-full text-sm'>
            <thead className='bg-[#f5f5f5] text-left'>
              <tr>
                <th className='p-3 font-medium'>Photo</th>
                <th className='p-3 font-medium'>Name</th>
                <th className='p-3 font-medium'>Role</th>
                <th className='p-3 font-medium'>Link</th>
                <th className='p-3 font-medium w-[140px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className='border-t border-gray-100'>
                  <td className='p-3'>
                    {r.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin may use any http(s) image host
                      <img
                        src={r.imageUrl}
                        alt=''
                        className='h-10 w-10 rounded-full object-cover bg-gray-100'
                      />
                    ) : (
                      <span className='text-[#888]'>—</span>
                    )}
                  </td>
                  <td className='p-3 font-medium'>{r.name}</td>
                  <td className='p-3'>{r.role}</td>
                  <td className='p-3 max-w-[200px] truncate'>
                    {r.url ? (
                      <a href={r.url} target='_blank' rel='noopener noreferrer' className='text-[#005CFF] underline'>
                        Open
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className='p-3'>
                    <div className='flex flex-wrap gap-2'>
                      <button type='button' onClick={() => openEdit(r)} className='text-[#005CFF] underline'>
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
            <DialogTitle>Edit member</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSaveEdit} className='flex flex-col gap-3 text-left'>
            <label className='flex flex-col gap-1 text-sm'>
              Name
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Role
              <input
                type='text'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Profile / LinkedIn URL (optional)
              <input
                type='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-base'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Photo URL (optional, or upload below)
              <input
                type='url'
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                disabled={Boolean(file)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-base disabled:opacity-50'
              />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
              Or replace photo (Cloudinary)
              <input
                type='file'
                accept='image/*'
                disabled={Boolean(imageUrlInput.trim())}
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
                className='rounded-lg bg-[#005CFF] px-4 py-2 text-sm font-medium text-white disabled:opacity-60'
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
