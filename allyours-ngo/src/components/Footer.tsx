'use client'
import Image from 'next/image'
import Link from 'next/link'
import allyourslogo from '../../public/assets/Images/all yours-01_cropped.png'
import Facebook from '../../public/assets/Icons.SVG/Socials/Facebook.svg'
import Instagram from '../../public/assets/Icons.SVG/Socials/Instagram.svg'
import X from '../../public/assets/Icons.SVG/Socials/X.svg'
import Linkedin from '../../public/assets/Icons.SVG/Socials/Linkedin.svg'
import Youtube from '../../public/assets/Icons.SVG/Socials/Youtube.svg'

export default function Footer() {
  return (
    <footer className='w-full bg-[#444444] text-[#f9f9f9]'>
      <div className='max-w-7xl w-full mx-auto px-5 md:px-8 py-[100px] flex flex-col lg:flex-row justify-between gap-[54px] '>
        <div className='max-w-[600px] flex flex-col space-y-[24px]'>
          <Image
            src={allyourslogo}
            alt='Allyours Logo'
            width={102}
            height={57}
            className='py-[5px] bg-[#f9f9f9] rounded-[24px]'
          />
          <p className='morangarg  text-[16px] lg:text-[20px]/[26px] '>
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div>
            <div className='flex  sm:flex-row items-start sm:items-center'>
              <input
                type='email'
                className='p-[12px] rounded-[24px] w-[363px] h-[48px] border border-[#b6b6b6] text-[16px] bg-transparent placeholder:text-[#cccccc] mb-3 sm:mb-0'
                placeholder='Enter your email'
              />
              <button className='bg-[#f9f9f9] w-[121px] h-[48px] rounded-[32px] border border-[#b6b6b6] hover:bg-[#E8E8E8] active:bg-[#B6B6B6] text-[16px] text-[#151515] sfprorg sm:ml-[15px] ml-[10px]'>
                Subscribe
              </button>
            </div>
            <p className='text-[12px] sfprorg mt-[10px] text-[#f9f9f9] tracking-wide w-[300px]'>
              By subscribing you agree to our <u>Privacy Policy</u> and provide consent to receive updates from our
              company.
            </p>
          </div>
        </div>
        <div className='w-full lg:w-[600px] flex flex-wrap lg:gap-[40px] md:gap-[90px] gap-[30px] '>    
          <div className='flex flex-col space-y-[16px] min-w-[150px]'>
            <h2 className='morangarg text-[24px]'>Navigation</h2>
            <Link href='/' className='sfprorg text-[16px]'>
              Peekaboo
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              For you & all of us
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Podcast
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Our Value
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Support Us
            </Link>
          </div>
          <div className='flex flex-col space-y-[16px] min-w-[150px] '>
            <h2 className='morangarg text-[24px]'>Contents</h2>
            <Link href='/' className='sfprorg text-[16px]'>
              Team Journey
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Meet the team
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Team JDs
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Our Achievements
            </Link>
            <Link href='/' className='sfprorg text-[16px]'>
              Become a Volunteer
            </Link>
          </div>
          <div className='flex flex-col space-y-[16px] min-w-[150px]'>
            <h2 className='morangarg text-[24px]'>Follow Us</h2>
            <Link href='/' className='sfprorg text-[16px] flex items-center'>
              <Image src={Facebook} alt='Facebook' width={24} height={24} className='mr-[10px]' />
              Facebook
            </Link>
            <Link href='/' className='sfprorg text-[16px] flex items-center'>
              <Image src={Instagram} alt='Instagram' width={24} height={24} className='mr-[10px]' />
              Instagram
            </Link>
            <Link href='/' className='sfprorg text-[16px] flex items-center'>
              <Image src={X} alt='X (Twitter)' width={24} height={24} className='mr-[10px]' />X
            </Link>
            <Link href='/' className='sfprorg text-[16px] flex items-center'>
              <Image src={Linkedin} alt='LinkedIn' width={24} height={24} className='mr-[10px]' />
              LinkedIn
            </Link>
            <Link href='/' className='sfprorg text-[16px] flex items-center'>
              <Image src={Youtube} alt='YouTube' width={24} height={24} className='mr-[10px]' />
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
  