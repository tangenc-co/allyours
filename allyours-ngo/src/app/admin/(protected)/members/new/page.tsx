'use client'

import { useState } from 'react'
import Link from 'next/link'
import { uploadImageToCloudinary } from '@/services/cloudinary'

export default function AddMemberPage() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [newId, setNewId] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const n = name.trim()
    const r = role.trim()
    if (!n || !r) {
      setStatus('error')
      setMessage('Name and role are required.')
      return
    }

    setStatus('saving')
    setMessage('')
    setNewId(null)

    try {
      let imageUrl = imageUrlInput.trim()
      if (file) {
        setMessage('Uploading image to Cloudinary…')
        imageUrl = await uploadImageToCloudinary(file)
      }
      if (imageUrl && !imageUrl.startsWith('http')) {
        setStatus('error')
        setMessage('Image URL must start with http(s).')
        return
      }

      setMessage('Saving to Firestore…')
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: n,
          role: r,
          url: url.trim(),
          imageUrl: imageUrl || '',
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
      setMessage('Member created. They will appear on the homepage after refresh.')
      setName('')
      setRole('')
      setUrl('')
      setImageUrlInput('')
      setFile(null)
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className='min-h-screen max-w-lg mx-auto px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold mb-2'>Add team member</h1>
      <p className='text-sm text-[#444] mb-8 leading-relaxed'>
        Creates a document in the Firestore <code className='text-xs bg-[#eee] px-1 rounded'>members</code> collection
        using the server (Admin SDK). Requires <code className='text-xs bg-[#eee] px-1 rounded'>FIREBASE_SERVICE_ACCOUNT_KEY</code> in{' '}
        <code className='text-xs bg-[#eee] px-1 rounded'>.env.local</code>.
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1 text-sm'>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='border border-gray-300 rounded-lg px-3 py-2 text-base'
            placeholder='Hein Htet'
            autoComplete='name'
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
            placeholder='Intern'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Profile / LinkedIn URL (optional)
          <input
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2 text-base'
            placeholder='https://linkedin.com/in/...'
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
            placeholder='https://res.cloudinary.com/...'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Or upload photo (Cloudinary)
          <input
            type='file'
            accept='image/*'
            disabled={Boolean(imageUrlInput.trim())}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className='text-sm disabled:opacity-50'
          />
        </label>
        <button
          type='submit'
          disabled={status === 'saving'}
          className='bg-[#005CFF] text-white rounded-lg py-2.5 px-4 font-medium disabled:opacity-60'
        >
          {status === 'saving' ? 'Saving…' : 'Add member'}
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
        <Link href='/admin/members' className='text-[#005CFF] underline'>
          All members (edit / delete)
        </Link>
        {' · '}
        <Link href='/admin/member-image' className='text-[#005CFF] underline'>
          Photo by document ID
        </Link>
        {' · '}
        <Link href='/admin/podcasts/new' className='text-[#AA16FF] underline'>
          Add podcast episode
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
