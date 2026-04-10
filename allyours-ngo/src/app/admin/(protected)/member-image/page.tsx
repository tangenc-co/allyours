'use client'

import { useState } from 'react'
import { uploadImageToCloudinary } from '@/services/cloudinary'
import { updateMemberImageUrl } from '@/services/firestore'

export default function MemberImageAdminPage() {
  const [memberId, setMemberId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [lastUrl, setLastUrl] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!memberId.trim() || !file) {
      setStatus('error')
      setMessage('Paste the Firestore document ID and choose an image.')
      return
    }
    setStatus('uploading')
    setMessage('Uploading to Cloudinary…')
    setLastUrl(null)
    try {
      const url = await uploadImageToCloudinary(file)
      setMessage('Saving URL to Firestore…')
      await updateMemberImageUrl(memberId.trim(), url)
      setLastUrl(url)
      setStatus('done')
      setMessage('Done. Refresh the homepage — the member should show this photo.')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className='min-h-screen max-w-lg mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Member photo (Cloudinary → Firestore)</h1>
      <p className='text-sm text-[#444] mb-8 leading-relaxed'>
        Flow: upload runs first; then the returned <code className='text-xs bg-[#eee] px-1 rounded'>secure_url</code> is
        written to the member&apos;s <code className='text-xs bg-[#eee] px-1 rounded'>imageUrl</code> field. Your public
        site already reads that field in &quot;Our Team Members&quot;.
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1 text-sm'>
          Firestore document ID
          <input
            type='text'
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder='e.g. u5Y8NYt1YZQXsh3xih65'
            className='border border-gray-300 rounded-lg px-3 py-2 text-base'
            autoComplete='off'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Image file
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className='text-sm'
          />
        </label>
        <button
          type='submit'
          disabled={status === 'uploading'}
          className='bg-[#005CFF] text-white rounded-lg py-2.5 px-4 font-medium disabled:opacity-60'
        >
          {status === 'uploading' ? 'Working…' : 'Upload & save imageUrl'}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-6 text-sm whitespace-pre-wrap ${status === 'error' ? 'text-red-600' : 'text-[#444]'}`}
          role='status'
        >
          {message}
        </p>
      ) : null}
      {lastUrl ? (
        <p className='mt-2 text-xs break-all text-[#666]'>
          URL saved: {lastUrl}
        </p>
      ) : null}

      <p className='mt-6 text-sm text-[#444]'>
        <a href='/admin/members' className='text-[#005CFF] underline'>
          All members (edit / delete)
        </a>
        {' · '}
        <a href='/admin/members/new' className='text-[#005CFF] underline'>
          Add a new team member
        </a>
      </p>

      <p className='mt-10 text-xs text-[#888] leading-relaxed'>
        If you see a Firestore permission error, open Firebase → Firestore → Rules and allow updates to{' '}
        <code>members</code> for signed-in admins only (recommended), or use the manual workaround: upload in Cloudinary
        Media Library, copy the URL, paste into the document in the Firebase console.
      </p>
    </div>
  )
}
