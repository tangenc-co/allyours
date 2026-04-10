'use client'

import { useState } from 'react'
import Link from 'next/link'
import { uploadImageToCloudinary } from '@/services/cloudinary'

export default function AddPodcastPage() {
  const [title, setTitle] = useState('')
  const [hostname, setHostname] = useState('')
  const [duration, setDuration] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [thumbnailInput, setThumbnailInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [newId, setNewId] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const t = title.trim()
    const h = hostname.trim()
    const d = duration.trim()
    const y = youtubeUrl.trim()
    if (!t || !h || !d || !y) {
      setStatus('error')
      setMessage('Title, host name, duration, and YouTube URL are required.')
      return
    }

    setStatus('saving')
    setMessage('')
    setNewId(null)

    try {
      let thumbnail = thumbnailInput.trim()
      if (file) {
        setMessage('Uploading thumbnail to Cloudinary…')
        thumbnail = await uploadImageToCloudinary(file)
      }

      setMessage('Saving to Firestore…')
      const res = await fetch('/api/podcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: t,
          hostname: h,
          duration: d,
          youtubeUrl: y,
          thumbnail,
        }),
      })

      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string; message?: string }

      if (!res.ok || !data.ok) {
        setStatus('error')
        setMessage(data.message || data.error || `Request failed (${res.status})`)
        return
      }

      setNewId(data.id ?? null)
      setStatus('done')
      setMessage('Episode saved. Refresh the homepage to see it in Section 4.')
      setTitle('')
      setHostname('')
      setDuration('')
      setYoutubeUrl('')
      setThumbnailInput('')
      setFile(null)
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className='min-h-screen max-w-lg mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Add podcast episode</h1>
      <p className='text-sm text-[#444] mb-8 leading-relaxed'>
        Creates a document in Firestore collection <code className='text-xs bg-[#eee] px-1 rounded'>podcasts</code>. Uses the
        same <code className='text-xs bg-[#eee] px-1 rounded'>FIREBASE_SERVICE_ACCOUNT_KEY</code> as members.
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1 text-sm'>
          Episode title
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='border border-gray-300 rounded-lg px-3 py-2 text-base'
            placeholder='Perspective of a Burma Illustrator…'
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
            placeholder='Ko Nu'
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
            placeholder='02:10 Mins'
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
            placeholder='https://www.youtube.com/watch?v=…'
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
            placeholder='https://i.ytimg.com/... or Cloudinary URL'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Or upload thumbnail
          <input
            type='file'
            accept='image/*'
            disabled={Boolean(thumbnailInput.trim())}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className='text-sm disabled:opacity-50'
          />
        </label>
        <p className='text-xs text-[#666]'>
          If you skip thumbnail, the API still accepts an empty thumbnail; the site will use a local fallback image.
        </p>
        <button
          type='submit'
          disabled={status === 'saving'}
          className='bg-[#AA16FF] text-white rounded-lg py-2.5 px-4 font-medium disabled:opacity-60'
        >
          {status === 'saving' ? 'Saving…' : 'Add episode'}
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
      {newId ? <p className='mt-2 text-xs text-[#666] break-all'>New document ID: {newId}</p> : null}

      <p className='mt-10 text-sm text-[#444]'>
        <Link href='/admin/podcasts' className='text-[#AA16FF] underline'>
          All episodes (edit / delete)
        </Link>
        {' · '}
        <Link href='/admin/members/new' className='text-[#005CFF] underline'>
          Add team member
        </Link>
        {' · '}
        <Link href='/admin/donations' className='text-[#005CFF] underline'>
          Manage donations
        </Link>
        {' · '}
        <Link href='/' className='text-[#005CFF] underline'>
          Homepage
        </Link>
      </p>

      <p className='mt-6 text-xs text-[#888] leading-relaxed'>
        Admin pages require Firebase sign-in.
      </p>
    </div>
  )
}
