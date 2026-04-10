import { redirect } from 'next/navigation'
import AdminSignUpClient from '@/components/admin/AdminSignUpClient'
import { getSessionUser, safeAdminNextPath } from '@/lib/auth-server'

export default async function AdminSignUpPage({
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
  return <AdminSignUpClient nextPath={next} />
}
