'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

import allyoursNavLogo from '../../public/assets/Images/all yours-01_cropped.png'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuSubOpen,setIsMenuSubOpen]=useState(false);
  return (
    <nav className='sticky top-[20px] bg-[#F9F9F9] border border-[#B6B6B6] rounded-full max-w-[350px] sm:max-w-[550px] mx-auto px-4 py-[10px] z-[50]'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <Image src={allyoursNavLogo} alt='Allyours Logo' width={100} height={25} />
        </Link>
        <div className='hidden md:flex items-center gap-[20px] text-[16px] sfprorg'>
          <Link href='/allyours'>allyours</Link>
          <Link href='/support-us'>Support Us</Link>
          <div
            className='relative'
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className='flex items-center text-[16px] cursor-pointer bg-transparent border-none'>
              Languages <ChevronDown size={16} className='ml-[4px]' />
            </button>
            {isDropdownOpen && (
              <div className='absolute top-full right-[10px] mt-[2px] w-[100px] bg-[#F9F9F9] border border-[#D3D3D3] rounded-[8px] text-[14px] shadow-md'>
                <Link href='/en' className='block px-[20px] py-[10px] text-[#151515] hover:bg-[#efefef]'>
                  English
                </Link>
                <div className='border-b border-[#D3D3D3]' />
                <Link href='/my' className='block px-[20px] py-[10px] text-[#151515] hover:bg-[#efefef]'>
                  Burmese
                </Link>
              </div>
            )}
          </div>

          <Link href='/contact-us'>
            <button className='bg-[#005CFF] px-[24px] py-[8px] rounded-[32px] text-[#F9F9F9] text-[16px]'>
              Contact
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <DropdownMenu
            open={isMobileMenuOpen}
            onOpenChange={(open) => {
              setIsMobileMenuOpen(open)
              if (!open) setIsMenuSubOpen(false)
            }}
          >
            <DropdownMenuTrigger asChild>
              <button className='p-2 rounded-full hover:bg-gray-200'>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-[300px] mt-3 border-none rounded-md items-center bg-white mr-2'
              side='bottom'
              align='end'
            >
              {!isMenuSubOpen ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href='/support-us'>Support Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger onClick={() => setIsMenuSubOpen(true)}>
                        <Link href=''>Languages</Link>
                      </DropdownMenuSubTrigger>
                    </DropdownMenuSub>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/contact-us'>Contact</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href='/en'>English</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/my'>Burmese</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/th'>Thai</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
