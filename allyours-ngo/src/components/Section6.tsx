'use client'

import Image from 'next/image'
import house from '../../public/assets/Icons.SVG/Two Tone Icons/house-2.svg'
import emoji from '../../public/assets/Icons.SVG/Two Tone Icons/emoji-normal.svg'
import coffee from '../../public/assets/Icons.SVG/Two Tone Icons/coffee.svg'
import avatar from '../../public/assets/Images/Avatar.png'
import avatar1 from '../../public/assets/Images/Avatar 1.png'
import avatar2 from '../../public/assets/Images/Avatar2.png'
import avatar3 from '../../public/assets/Images/Avatar3.png'
import avatar4 from '../../public/assets/Images/Avatar4.png'
import avatar5 from '../../public/assets/Images/Avatar5.png'
import plus from '../../public/assets/Icons.SVG/Outline Icons/add.svg'
import DownloadPDF from '@/components/DownloadPDF'
import { useEffect, useState } from 'react'
import { getMembers, type Member as FirestoreMember } from '@/services/firestore'

const FALLBACK_AVATARS = [avatar, avatar1, avatar2, avatar3, avatar4, avatar5]

type MemberRow = {
  id: string
  name: string
  role: string
  link: string
  image: string | typeof avatar
}

export default function Section6() {
  const [members, setMembers] = useState<MemberRow[]>([])

  useEffect(() => {
    let isMounted = true
    const mapRows = (rows: FirestoreMember[]): MemberRow[] =>
      rows.map((m, index) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        link: m.link || '#',
        image: (m.imageUrl as string | null) ?? FALLBACK_AVATARS[index % FALLBACK_AVATARS.length],
      }))

    const load = async () => {
      try {
        const res = await fetch('/api/members', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as { members?: FirestoreMember[] }
          const rows = data.members ?? []
          if (isMounted) setMembers(mapRows(rows))
          return
        }
      } catch {
        // try client Firestore below
      }
      try {
        const rows = await getMembers()
        if (isMounted) setMembers(mapRows(rows))
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <div className='text-center min-h-[352px] py-[72px] bg-[#005CFF] flex flex-col items-center justify-around'>
        <h2 className='text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px] morangamd text-[#f9f9f9] mb-[35px]'>Know Our Mission</h2>
        <div className='flex flex-col lg:flex-row gap-[44px] md:gap-[64px]'>
          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={house} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>

          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={emoji} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>
          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={coffee} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>
        </div>
      </div>
      <div className='text-center py-[74px] md:py-[94px] flex flex-col items-center' id="section6">
        <p className='font-[600] text-[16px] mb-[15px]'>We Bring the Impacts</p>
        <h2 className='morangamd text-[32px]/[40px] lg:text-[48px]/[64px] mb-[60px]'>Our Team Members</h2>

        <div className='mx-[10px] md:mx-[20px]'>
          <div className='flex flex-wrap items-center justify-center max-w-[1170px] gap-[44px] md:gap-[64px]'>
            {/* {members.map((member, index) => (
              <div key={index} className='flex items-center justify-start w-[145px] md:w-[244px] '>
                <Image src={member.image} alt='Peekaboo illustration' width={56} height={56} className="size-[40px] md:size-[56px]"/>
                <span className='text-[14px] md:text-[16px] sfprorg font-[700] w-[100%] ml-[5px] md:ml-[20px] text-start'>{member.name}</span>
              </div>
            ))} */}
            {members.map((member, index) => (
  <div
    key={index}
    className="relative group flex items-center justify-start w-[145px] md:w-[244px]"
  >
    {/* Avatar + Name (always visible) */}
    <Image
      src={member.image}
      alt={member.name}
      width={56}
      height={56}
      className="size-[40px] md:size-[56px] rounded-full cursor-pointer"
      unoptimized
    />
    <span className="text-[14px] md:text-[16px] sfprorg font-[700] w-[100%] ml-[5px] md:ml-[20px] text-start">
      {member.name}
    </span>

    {/* Tooltip Card (hover, stays when hovered) */}
    <div className="absolute left-2/3 -translate-x-1/2 top-[60px] opacity-0 group-hover:opacity-100 transition duration-300 z-[100]">
      <div className="flex items-center bg-[#005CFF] text-white rounded-2xl shadow-lg p-4 w-[260px] xl:w-[326px]">
        {/* Avatar inside tooltip */}
        <Image
          src={member.image}
          alt={member.name}
          width={60}
          height={60}
          className="rounded-full"
          unoptimized
        />

        {/* Info */}
        <div className="ml-4 flex-1 text-start">
          <h4 className="font-bold text-[16px] sfprorg">{member.name}</h4>
          <p className="text-[16px] opacity-90">{member.role}</p>
        </div>

        {/* LinkedIn Icon */}
        <div className="pl-3 border-l border-white/50 flex items-center min-h-[50px]">
          <a
            href={member.link.startsWith('http') ? member.link : '#'}
            target={member.link.startsWith('http') ? '_blank' : undefined}
            rel={member.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="ml-3 hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
))}


          </div>
          <div className='flex items-center gap-[10px] md:gap-[20px] mt-[55px] ml-[30px] md:ml-0'>
            <Image
              src={plus}
              alt='Peekaboo illustration'
              width={56}
              height={56}
              className='bg-[#005cff] p-[5px] rounded-[30px] cursor-pointer'
            />
            <span className='sfprobold text-[16px]'>Click To Apply</span>
          </div>
        </div>
      </div>
      <DownloadPDF variant='achievements' />
    </>
  )
}
