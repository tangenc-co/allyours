'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import allyoursNavLogo from '../../public/assets/Images/all yours-01_cropped.png'
import Menu from '../../public/assets/Icons.SVG/Outline Icons/menu.svg'
export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className='sticky top-[20px] bg-[#F9F9F9] border border-[#B6B6B6] rounded-full max-w-[500px] mx-auto  p-[10px] z-[50]'>
      <div className='flex items-center align-items-center justify-between'>
        <Link href='/'>
          <Image src={allyoursNavLogo} alt='Allyours Logo' width={100} height={25} priority />
        </Link>
        <Link href='/allyours' className='no-underline text-[#151515] text-[16px]'>
          allyours
        </Link>
        <Link href='/support-us' className='no-underline text-[#151515] text-[16px]'>
          Support Us
        </Link>
        <div
          className='relative'
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className='flex items-center border-none bg-transparent text-[16px] cursor-pointer'>
            Languages <ChevronDown size={16} className='ml-[4px]' />
          </button>
          {isDropdownOpen && (
            <div className='absolute top-full right-[10px] mt-[2px] w-[100px] bg-[#F9F9F9] border border-[#D3D3D3] rounded-[8px] text-[14px] shadow-md'>
              <Link href='/en' className='block px-[20px] py-[10px] no-underline text-[#151515] hover:bg-[#efefef]'>
                English
              </Link>
              <div className='border-b border-[#D3D3D3]' />
              <Link href='/my' className='block px-[20px] py-[10px] no-underline text-[#151515] hover:bg-[#efefef]'>
                Burmese
              </Link>
            </div>
          )}
        </div>
        <Link href='/contact-us'>
          <button className='bg-[#005CFF] cursor-pointer px-[24px] py-[8px] rounded-[32px] border-none text-[#F9F9F9] text-[16px]'>
            Contact
          </button>
        </Link>
      </div>
    </nav>
  )
}
