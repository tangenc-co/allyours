import { redirect } from 'next/navigation'
import AdminLoginClient from '@/components/admin/AdminLoginClient'
import { getSessionUser, safeAdminNextPath } from '@/lib/auth-server'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const user = await getSessionUser()
  const sp = await searchParams
  const next = safeAdminNextPath(sp.next)
  if (user) {
    redirect(next)
  }
  return <AdminLoginClient nextPath={next} />
}
