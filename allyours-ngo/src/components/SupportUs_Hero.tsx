'use client'

import Image from 'next/image'
import leftblob from '../../public/assets/Illustration.SVG/leftblob.svg'
import rightblob from '../../public/assets/Illustration.SVG/rightblob.svg'
import tbleftblob from '../../public/assets/Illustration.SVG/tbleftblob.svg'
import tbrightblob from '../../public/assets/Illustration.SVG/tbrightblob.svg'
import mbleftblob from '../../public/assets/Illustration.SVG/mbleftblob.svg'
import mbrightblob from '../../public/assets/Illustration.SVG/mbrightblob.svg'
import MouseIcon from '../../public/assets/IconComponents/IconComponents'

export default function SupportUsHero() {
  return (
    <div className='relative mx-auto mt-[100px] overflow-hidden px-4'>

      <Image
        src={leftblob}
        alt='Decorative background left blob'
        width={196}
       
        priority
        className='absolute top-0 left-0 hidden lg:block'
      />
      <Image
        src={tbleftblob}
        alt='Tablet left blob'
        width={54}
        
        className='absolute -top-[65px] left-0 hidden md:block xl:hidden'
      />
      <Image
        src={mbleftblob}
        alt='Mobile left blob'
        width={20}
        height={26}
        className='absolute top-[250px] left-0 block md:hidden'
      />

      <div className='text-center max-w-[1104px] mx-auto mb-[80px] py-[32px]'>
        <p className='text-[32px] leading-[44px] md:text-[48px] md:leading-[64px] lg:text-[68px] lg:leading-[80px] morangamd mb-[30px]'>
          Together, we can improve <br className='hidden lg:block' /> and build our design community
        </p>
        <p className='text-[14px] leading-[24px] md:text-[16px] md:leading-[28px] lg:text-[20px] lg:leading-[30px] text-[#444444] sfprorg mb-[30px] max-w-[1000px] mx-auto'>
          We&apos;re here to fight brain drain and creative burnout by uplifting design talent through growth, <br />
          community, purpose, and opportunity. Your support helps shape a stronger future for the industry.
        </p>

        
        <div className='flex flex-col md:flex-row justify-center gap-4 max-w-[400px] mx-auto'>
          <button className='py-[14px] px-[24px] rounded-[24px] w-[183px] h-[47px] text-white bg-[#005cff] text-[16px] hover:bg-[#337DFF] transition-colors'>
            Donate Now
          </button>
          <button className='py-[14px] px-[24px] rounded-[24px] border border-[#000] w-[183px] h-[47px] text-[#000] bg-white text-[16px] hover:bg-[#f0f0f0] transition-colors'>
            Talk to Us
          </button>
        </div>
      </div>


      <Image
        src={rightblob}
        alt='Decorative background right blob'
        width={196}
        height={196}
        className='absolute top-0 right-0 hidden lg:block'
      />
      <Image
        src={tbrightblob}
        alt='Tablet right blob'
        width={54}
       
        className='absolute -top-[65px] right-0 hidden md:block lg:hidden'
      />
      <Image
        src={mbrightblob}
        alt='Mobile right blob'
        width={20}
        height={26}
        className='absolute top-[290px] right-0 block md:hidden'
      />
      <div className='flex justify-center text-[#005CFF] lg:mt-[150px] md:hidden'>
        <MouseIcon />
      </div>
    </div>
  )
}
