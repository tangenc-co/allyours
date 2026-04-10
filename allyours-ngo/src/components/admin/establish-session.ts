'use client'

export async function establishServerSession(idToken: string): Promise<boolean> {
  const res = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
  if (!res.ok) return false
  const data = (await res.json()) as { ok?: boolean }
  return Boolean(data.ok)
}
