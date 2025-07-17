'use client'
import Image from 'next/image'
import frontPeekaboo from '../../public/assets/Illustration.SVG/peekaboo illustration front.svg'
import backPeekaboo from '../../public/assets/Illustration.SVG/peekaboo illustration back.svg'
import { useEffect, useState } from 'react'

import CurvedSlider from './subcomponents/CurvedSlider'
import { Marquee } from './subcomponents/Marquee'

const slides: string[] = [
  '/assets/Images/peekaboo Image 1.jpg',
  '/assets/Images/peekaboo Image 2.jpg',
  '/assets/Images/peekaboo Image 3.jpg',
  '/assets/Images/peekaboo Image 4.jpg',
  '/assets/Images/peekaboo Image 5.jpg',

  '/assets/Images/peekaboo Image 1.jpg',
  '/assets/Images/peekaboo Image 2.jpg',
  '/assets/Images/peekaboo Image 3.jpg',
  '/assets/Images/peekaboo Image 4.jpg',
  '/assets/Images/peekaboo Image 5.jpg',
]

export default function Section3() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='min-h-screen w-full'>
      <div className='text-center flex flex-col items-center justify-between h-[235px] py-8 mb-[-130px] md:mb-[-220px] mt-[40px]'>
        <div className='flex justify-evenly'>
          <Image
            src={frontPeekaboo}
            alt='Peekaboo illustration'
            width={48}
            height={48}
            className='mr-[10px] mt-[2px]'
          />
          <h1 className='max-w-[190px] md:max-w-[474px] text-[#fe6835] text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[68px] mt-4 morangamd'>Design Thinking Jam Peekaboo</h1>
          <Image src={backPeekaboo} alt='Peekaboo illustration' width={48} height={48} className='ml-[10px] mt-[2px]' />
        </div>
        <p className='w-full max-w-[1258px] text-center text-gray-800 text-[14px] md:text-[16px] lg:text-[20px]/[30px] p-4 sfprorg'>
          Peekaboo by allyours assemble creatives and enthusiasts to explore the integration of art and design into
          daily lives. The 1st Peekaboo Event and the 2nd Peekaboo Design Jam both connected the participants in a
          lively atmosphere, a vibrant and immersive experience.
        </p>
        <div className='flex justify-between w-[262px] h-[47px] mx-auto mt-4'>
          <button className='py-[10px] px-[14px] rounded-[24px] border-none w-[116px] h-[47px] cursor-pointer text-[#fff] bg-[#fe6835] text-[16px] hover:bg-[#e55b2d] transition-colors'>
            Join Now
          </button>
          <button className='rounded-[24px] border-[1px] border-[#b6b6b6] w-[130px] h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[16px] hover:bg-gray-100 transition-colors'>
            Know More
          </button>
        </div>
      </div>

      {isClient && (
        <>
          <CurvedSlider images={slides} />
          <Marquee />
        </>
      )}
    </div>
  )
}
