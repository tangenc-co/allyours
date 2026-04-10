'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import document from '../../public/assets/Icons.SVG/Outline Icons/document-download.svg'

const copy = {
  support: {
    title: 'Six Months Donation Report',
    body:
      "Download and explore our six-month journey of progress and impact. With your support, we've strengthened our organization, empowered communities, and advanced creative initiatives. From fostering inclusive growth to opening new opportunities, each step reflects our shared commitment to sustainable change.",
    outer: 'px-[20px]',
  },
  achievements: {
    title: 'Know Our Achievements',
    body:
      "Download and explore our journey of past achievements and the meaningful impact we've made in communities. From empowering youth and fostering inclusive growth to creating real opportunities for change, our milestones reflect a shared commitment to building a brighter, sustainable future for the creative industry.",
    outer: 'px-[32px] lg:px-[92px]',
  },
} as const

type Variant = keyof typeof copy

export default function DownloadPDF({
  variant = 'support',
  className = '',
}: {
  variant?: Variant
  className?: string
}) {
  const { title, body, outer } = copy[variant]
  const topMargin = variant === 'support' ? 'mt-12' : 'mt-0'
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/donation-report', { cache: 'no-store' })
        const data = (await res.json()) as { url?: string | null }
        const raw = typeof data.url === 'string' ? data.url.trim() : ''
        const u = raw.startsWith('http') || raw.startsWith('/') ? raw : null
        if (!cancelled) setUrl(u)
      } catch {
        if (!cancelled) setUrl(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const hasPdf = Boolean(url)

  return (
    <div
      className={`min-h-[300px] bg-[#005CFF] text-start py-[44px] md:py-[92px] flex flex-col items-center w-full ${topMargin} ${outer} ${className}`}
    >
      <div className='max-w-[337px] sm:max-w-[1256px] flex flex-col gap-[32px] text-[#f9f9f9] text-start'>
        <h2 className='morangamd text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px]'>{title}</h2>
        <p className='sfprorg text-[14px] md:text-[18px]/[40px] lg:text-[20px]/[30px]'>{body}</p>
        {loading ? (
          <p className='sfprorg text-[14px] text-white/80'>Checking for report…</p>
        ) : hasPdf && url ? (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            download
            className='bg-[#FE6835] hover:bg-[#FE865D] active:bg-[#B44A26] rounded-[24px] border-[1px] border-[#fff] w-[187px] flex items-center gap-[8px] py-[14px] px-[24px] cursor-pointer no-underline'
          >
            <Image src={document} alt='' width={24} height={24} />
            <span className='sfprorg text-[16px] text-[#f9f9f9]'>Download PDF</span>
          </a>
        ) : (
          <p className='sfprorg text-[14px] text-white/85'>Report PDF is not available yet — check back soon.</p>
        )}
      </div>
    </div>
  )
}
