'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'
import { establishServerSession } from '@/components/admin/establish-session'

function mapAuthError(code: string): string {
  const m: Record<string, string> = {
    'auth/email-already-in-use': 'That email is already registered. Sign in instead.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/popup-blocked': 'Pop-up was blocked. Allow pop-ups for this site.',
    'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method.',
  }
  return m[code] ?? 'Could not create account. Try again.'
}

export default function AdminSignUpClient({ nextPath }: { nextPath: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function afterFirebaseSignIn(getToken: () => Promise<string>) {
    const idToken = await getToken()
    const ok = await establishServerSession(idToken)
    if (!ok) {
      setError('Account created but admin session failed. Check FIREBASE_SERVICE_ACCOUNT_KEY on the server.')
      return
    }
    router.replace(nextPath)
    router.refresh()
  }

  async function onEmailSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== password2) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Use at least 6 characters for the password.')
      return
    }
    const auth = getFirebaseAuth()
    if (!auth) {
      setError('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* in .env.local.')
      return
    }
    setBusy(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
      await afterFirebaseSignIn(() => cred.user.getIdToken())
    } catch (err: unknown) {
      const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
      setError(mapAuthError(code))
    } finally {
      setBusy(false)
    }
  }

  async function onGoogleSignUp() {
    setError(null)
    const auth = getFirebaseAuth()
    if (!auth) {
      setError('Firebase is not configured.')
      return
    }
    setBusy(true)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      const cred = await signInWithPopup(auth, provider)
      await afterFirebaseSignIn(() => cred.user.getIdToken())
    } catch (err: unknown) {
      const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
      setError(mapAuthError(code))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className='mx-auto max-w-md px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold'>Admin sign up</h1>
      <p className='mt-2 text-sm leading-relaxed text-[#444]'>
        Create a Firebase Authentication user for this project. You can use email/password or Google. Restrict who can
        sign up in production using Firebase Console (e.g. disable sign-up or use authorized domains only).
      </p>

      <form onSubmit={onEmailSignUp} className='mt-8 flex flex-col gap-4'>
        <label className='flex flex-col gap-1 text-sm'>
          Email
          <input
            type='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='rounded-lg border border-gray-300 px-3 py-2 text-base'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Password
          <input
            type='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className='rounded-lg border border-gray-300 px-3 py-2 text-base'
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Confirm password
          <input
            type='password'
            autoComplete='new-password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            minLength={6}
            className='rounded-lg border border-gray-300 px-3 py-2 text-base'
          />
        </label>
        {error ? <p className='text-sm text-red-600'>{error}</p> : null}
        <button
          type='submit'
          disabled={busy}
          className='rounded-lg bg-[#005CFF] py-2.5 text-sm font-medium text-white disabled:opacity-60'
        >
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-xs uppercase tracking-wide text-[#888]'>
          <span className='bg-[#f9f9f9] px-3'>or</span>
        </div>
      </div>

      <button
        type='button'
        disabled={busy}
        onClick={onGoogleSignUp}
        className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-[#151515] disabled:opacity-60'
      >
        <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden>
          <path
            fill='#4285F4'
            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
          />
          <path
            fill='#34A853'
            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
          />
          <path
            fill='#FBBC05'
            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
          />
          <path
            fill='#EA4335'
            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
          />
        </svg>
        Continue with Google
      </button>

      <p className='mt-10 text-center text-sm text-[#444]'>
        Already have an account?{' '}
        <Link
          href={`/admin/login?next=${encodeURIComponent(nextPath)}`}
          className='font-medium text-[#005CFF] underline'
        >
          Sign in
        </Link>
      </p>
      <p className='mt-6 text-center text-sm'>
        <Link href='/' className='text-[#005CFF] underline'>
          Back to site
        </Link>
      </p>
    </div>
  )
}
