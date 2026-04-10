import { cert, getApps, initializeApp, type App, type ServiceAccount } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

/**
 * Server-only Firestore (bypasses client Security Rules + App Check).
 * Set FIREBASE_SERVICE_ACCOUNT_KEY to the full JSON of a service account
 * (Firebase Console → Project settings → Service accounts → Generate new private key).
 */
export function getAdminApp(): App | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim()
  if (!raw) return null
  try {
    if (getApps().length) return getApps()[0]!
    const serviceAccount = JSON.parse(raw) as ServiceAccount
    return initializeApp({
      credential: cert(serviceAccount),
    })
  } catch {
    return null
  }
}

export function getAdminDb(): Firestore | null {
  const app = getAdminApp()
  if (!app) return null
  const dbId = process.env.FIRESTORE_DATABASE_ID?.trim() || process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID?.trim()
  if (dbId) {
    return getFirestore(app, dbId)
  }
  return getFirestore(app)
}

export function getAdminAuth(): Auth | null {
  const app = getAdminApp()
  if (!app) return null
  return getAuth(app)
}
