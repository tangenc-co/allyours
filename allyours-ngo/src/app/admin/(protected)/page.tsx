import Link from 'next/link'

const cards = [
  {
    href: '/admin/members',
    title: 'Team members',
    description: 'List, edit, or delete members on the homepage. Add new members or update photos.',
    accent: 'text-[#005CFF]',
    border: 'border-[#005CFF]/30 hover:border-[#005CFF]/60',
  },
  {
    href: '/admin/podcasts',
    title: 'Podcasts',
    description: 'Manage Section 4 episodes: edit, delete, or add new ones.',
    accent: 'text-[#AA16FF]',
    border: 'border-[#AA16FF]/30 hover:border-[#AA16FF]/60',
  },
  {
    href: '/admin/donations',
    title: 'Donations',
    description: 'Toggle which donations appear in the public donor report.',
    accent: 'text-[#005CFF]',
    border: 'border-gray-300 hover:border-gray-400',
  },
  {
    href: '/admin/donation-report',
    title: 'Report PDF',
    description: 'Static file in public/ — instructions to replace donation-report.pdf.',
    accent: 'text-[#FE6835]',
    border: 'border-[#FE6835]/30 hover:border-[#FE6835]/60',
  },
] as const

export default function AdminHomePage() {
  return (
    <div className='mx-auto max-w-5xl px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold'>Admin</h1>
      <p className='mt-2 max-w-2xl text-sm leading-relaxed text-[#444]'>
        Choose an area to manage. You must stay signed in with Firebase Authentication (email or Google).
      </p>

      <ul className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className={`block h-full rounded-xl border-2 bg-white p-6 shadow-sm transition-colors ${c.border}`}
            >
              <h2 className={`text-lg font-semibold ${c.accent}`}>{c.title}</h2>
              <p className='mt-2 text-sm leading-relaxed text-[#555]'>{c.description}</p>
              <span className={`mt-4 inline-block text-sm font-medium underline ${c.accent}`}>Open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mt-12 rounded-lg border border-gray-200 bg-[#fafafa] p-5 text-sm text-[#444]'>
        <p className='font-medium text-[#151515]'>Shortcuts</p>
        <ul className='mt-3 flex flex-wrap gap-x-4 gap-y-2'>
          <li>
            <Link href='/admin/members/new' className='text-[#005CFF] underline'>
              Add member
            </Link>
          </li>
          <li>
            <Link href='/admin/member-image' className='text-[#005CFF] underline'>
              Member photo (by ID)
            </Link>
          </li>
          <li>
            <Link href='/admin/podcasts/new' className='text-[#AA16FF] underline'>
              Add podcast
            </Link>
          </li>
          <li>
            <Link href='/' className='text-[#005CFF] underline'>
              View site
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
