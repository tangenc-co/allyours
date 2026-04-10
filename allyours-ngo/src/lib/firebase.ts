import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

/** Only set if you created a non-default Firestore database in the Firebase Console. */
const firestoreDatabaseId = process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID

function isConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
}

let appCheckInitialized = false

/**
 * If Firestore has App Check *enforced*, reads fail without a valid token.
 * Register your web app in Firebase → App Check (reCAPTCHA v3), put the site key in .env,
 * set NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG=true locally, copy the debug token from the browser
 * console into Firebase → App Check → Manage debug tokens, then reload.
 */
function initAppCheckForWeb(app: FirebaseApp): void {
  if (typeof window === 'undefined' || appCheckInitialized) return
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()
  if (!siteKey) return

  appCheckInitialized = true
  if (process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG === 'true') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firebase debug global
    ;(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    })
  } catch (e) {
    console.warn('[Firebase] App Check init failed:', e)
    appCheckInitialized = false
  }
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isConfigured()) return null
  const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
  initAppCheckForWeb(app)
  return app
}

export function getDb(): Firestore | null {
  const app = getFirebaseApp()
  if (!app) return null
  if (firestoreDatabaseId) {
    return getFirestore(app, firestoreDatabaseId)
  }
  return getFirestore(app)
}

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp()
  if (!app) return null
  return getAuth(app)
}

let didLogFirebaseProject = false

/** Helps confirm the running app matches the project where your data lives (check browser console). */
export function logFirebaseProjectDebug(): void {
  if (process.env.NODE_ENV !== 'development' || didLogFirebaseProject) return
  didLogFirebaseProject = true
  const app = getFirebaseApp()
  if (!app) {
    console.warn('[Firebase] Not initialized — check NEXT_PUBLIC_FIREBASE_* in .env.local')
    return
  }
  console.info('[Firebase] projectId:', app.options.projectId, firestoreDatabaseId ? `db:${firestoreDatabaseId}` : 'db:(default)')
}
