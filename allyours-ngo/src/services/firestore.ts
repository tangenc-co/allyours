import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { getDb, logFirebaseProjectDebug } from '@/lib/firebase'

const COLLECTIONS = {
  testimonials: 'testimonials',
  members: 'members',
  posts: 'posts',
} as const

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis()
  return 0
}

function normalizeImageUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null
  const v = value.trim()
  return v.startsWith('http') ? v : null
}

function stripSort<T extends Record<string, unknown> & { _sort: number }>(row: T): Omit<T, '_sort'> {
  const { _sort: _, ...rest } = row
  void _
  return rest as Omit<T, '_sort'>
}

export type Testimonial = {
  id: string
  name: string
  review: string
  rating: number
  position: string
  image: string | null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const db = getDb()
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.testimonials))
    const withSort = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        name: String(d.name ?? ''),
        review: String(d.review ?? ''),
        rating: Number(d.rating ?? 5),
        position: String(d.position ?? ''),
        image: normalizeImageUrl(d.imageUrl ?? d.image),
        _sort: toMillis(d.createdAt),
      }
    })
    withSort.sort((a, b) => b._sort - a._sort)
    return withSort.map(stripSort)
  } catch {
    return []
  }
}

export type Member = {
  id: string
  name: string
  role: string
  link: string
  imageUrl: string | null
}

/** Set `imageUrl` on a member after Cloudinary returns `secure_url`. Requires Firestore rules to allow this update (e.g. admin-only). */
export async function updateMemberImageUrl(memberId: string, imageUrl: string): Promise<void> {
  const db = getDb()
  if (!db) throw new Error('Firebase is not configured')
  await updateDoc(doc(db, COLLECTIONS.members, memberId), { imageUrl })
}

export async function getMembers(): Promise<Member[]> {
  logFirebaseProjectDebug()
  const db = getDb()
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.members))
    const withSort = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        name: String(d.name ?? ''),
        role: String(d.role ?? ''),
        link: String(d.url ?? d.link ?? ''),
        imageUrl: normalizeImageUrl(d.imageUrl ?? d.image),
        _sort: toMillis(d.createdAt),
      }
    })
    withSort.sort((a, b) => a._sort - b._sort)
    return withSort.map(stripSort)
  } catch (e) {
    console.error('[getMembers] Firestore read failed:', e)
    const code = typeof e === 'object' && e !== null && 'code' in e ? String((e as { code: string }).code) : ''
    if (code === 'permission-denied') {
      console.error(
        '[getMembers] permission-denied → A) Firebase → App Check → Firestore: turn enforcement OFF, or B) add NEXT_PUBLIC_RECAPTCHA_SITE_KEY + NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG=true, register the debug token from the console in App Check. C) Publish firestore.rules. D) Google Cloud → Credentials → Browser key referrers include http://localhost:*',
      )
    }
    return []
  }
}

export type Post = {
  id: string
  title: string
  content: string
  imageUrl: string | null
}

export async function getPosts(): Promise<Post[]> {
  const db = getDb()
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.posts))
    const withSort = snap.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        title: String(d.title ?? ''),
        content: String(d.content ?? ''),
        imageUrl: normalizeImageUrl(d.imageUrl),
        _sort: toMillis(d.createdAt),
      }
    })
    withSort.sort((a, b) => b._sort - a._sort)
    return withSort.map(stripSort)
  } catch {
    return []
  }
}
