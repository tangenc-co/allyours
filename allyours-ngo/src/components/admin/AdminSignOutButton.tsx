'use client'

import { signOut } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'

export default function AdminSignOutButton() {
  async function onSignOut() {
    const auth = getFirebaseAuth()
    if (auth) {
      try {
        await signOut(auth)
      } catch {
        /* ignore */
      }
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      /* ignore */
    }
    window.location.href = '/admin/login'
  }

  return (
    <button
      type='button'
      onClick={onSignOut}
      className='text-sm text-[#444] underline decoration-gray-400 hover:text-[#151515]'
    >
      Sign out
    </button>
  )
}
