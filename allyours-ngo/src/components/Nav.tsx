'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {  Menu, X } from 'lucide-react'
import Chat from "../../public/assets/Illustration.SVG/Chat Round Like.svg"
import Heart from "../../public/assets/Illustration.SVG/Heart Pulse.svg"
import ChatGreen from "../../public/assets/Illustration.SVG/Chat Round Call.svg"
import Laptop from "../../public/assets/Illustration.SVG/Laptop 3.svg"
import allyoursNavLogo from '../../public/assets/Images/all yours-01_cropped.png'
import Members from "../../public/assets/Illustration.SVG/Users Group Two Rounded.svg"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
 
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  
} from '@/components/ui/dropdown-menu'

export default function Nav() {
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuSubOpen,setIsMenuSubOpen]=useState(false);

  const allyoursItems = [
    {
      id: 1,
      icon: Chat ,
      text: 'for u & all of us',
      to: '#section2'
    },
    {
      id: 2,
      icon: Heart ,
      text: 'Peekaboo',
      to: '#section3'
    },
    {
      id: 3,
      icon:  ChatGreen ,
      text: 'Our Podcast',
      to:'#section4'
    },
    {
      id: 4,
      icon: Laptop ,
      text: 'Vision & Mission',
      to:'#section5'
    },
    {
      id: 5,
      icon:  Members ,
      text: 'Meet the team',
      to:'#section6'
    },
  ]

  return (
    <nav className='sticky top-[20px] bg-[#F9F9F9] border border-[#B6B6B6] rounded-full max-w-[350px] sm:max-w-[550px] mx-auto px-4 py-[10px] z-[50]'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <Image src={allyoursNavLogo} alt='Allyours Logo' width={100} height={25} />
        </Link>
        <div className='hidden md:flex items-center space-x-5 text-[16px] sfprorg'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className='cursor-pointer'>allyours</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white mt-2' align='center'>
              {allyoursItems.map((item) => (
                <div key={item.id} className='flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-50'>
                  <Image src={item.icon} alt={item.text} width={24} height={24} />
                  <DropdownMenuItem> <a href={item.to}>{item.text}</a></DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href='/support-us'>Support Us</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='text-[16px] '>Languages</NavigationMenuTrigger>
                <NavigationMenuContent className='bg-white '>
                  <ul className='p-4 w-[150px] '>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='/en' className='block px-2 py-1 hover:bg-gray-50 '>
                          English
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='/my' className='block px-2 py-1 hover:bg-gray-50 '>
                          Burmese
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='/th' className='block px-2 py-1 hover:bg-gray-50'>
                          Thai
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href='/contact-us'>
            <button className='bg-[#005CFF] hover:bg-[#337DFF] active:bg-[#0041B5] px-[24px] py-[8px] rounded-[32px] text-[#F9F9F9] text-[16px]'>
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
              <button className='p-2 border-none'>{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-[300px] mt-3 border-none rounded-md items-center bg-white mr-2 sfprorg text-[16px] tracking-wider'
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
