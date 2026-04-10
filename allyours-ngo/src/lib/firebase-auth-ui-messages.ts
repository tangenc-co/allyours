/**
 * User-facing strings for Firebase Auth error codes (client SDK).
 * @see https://firebase.google.com/docs/auth/admin/errors
 */
const COMMON: Record<string, string> = {
  'auth/unauthorized-domain':
    'This host is not allowed to use Firebase Auth. In Firebase Console → Authentication → Settings → Authorized domains, add your production domain and your Vercel URL (e.g. project.vercel.app).',
  'auth/operation-not-allowed':
    'This sign-in method is turned off in Firebase. Enable Google and Email/Password under Authentication → Sign-in method.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/internal-error': 'Firebase had an internal error. Try again in a moment.',
  'auth/too-many-requests': 'Too many attempts. Wait a bit and try again.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Pop-up was blocked. Allow pop-ups for this site.',
  'auth/account-exists-with-different-credential':
    'An account already exists with a different sign-in method.',
}

export const FIREBASE_AUTH_SIGN_UP_MESSAGES: Record<string, string> = {
  ...COMMON,
  'auth/email-already-in-use': 'That email is already registered. Sign in instead.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
}

export const FIREBASE_AUTH_SIGN_IN_MESSAGES: Record<string, string> = {
  ...COMMON,
  'auth/invalid-email': 'Invalid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found for that email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Email or password is incorrect.',
}

export function firebaseAuthErrorMessage(
  code: string | undefined,
  map: Record<string, string>,
  fallback: string,
): string {
  if (!code) return fallback
  return map[code] ?? fallback
}
