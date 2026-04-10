import Link from 'next/link'
import { getSessionUser, redirectToAdminLogin } from '@/lib/auth-server'
import AdminSignOutButton from '@/components/admin/AdminSignOutButton'

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSessionUser()
  if (!session) {
    await redirectToAdminLogin()
  }
  const user = session!

  return (
    <div className='border-b border-gray-200 bg-white'>
      <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3'>
        <p className='min-w-0 truncate text-sm text-[#444]'>
          Signed in as <span className='font-medium text-[#151515]'>{user.email ?? user.uid}</span>
        </p>
        <div className='flex shrink-0 items-center gap-4'>
          <Link href='/admin' className='text-sm font-medium text-[#005CFF] underline'>
            Admin home
          </Link>
          <AdminSignOutButton />
        </div>
      </div>
      {children}
    </div>
  )
}
