/** HttpOnly session cookie set by POST /api/auth/session (Firebase Admin session JWT). */
export const ADMIN_SESSION_COOKIE_NAME = 'allyours_admin_session'

/** Must stay within Firebase limits (5 min – 14 days). */
export const ADMIN_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 5
