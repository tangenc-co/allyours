import Vector from '../../public/assets/Vector.png'
import Vector1 from '../../public/assets/Vector1.png'

import Image from 'next/image'
import MouseIcon from '../../public/assets/IconComponents/IconComponents'
export default function SupportUsHero() {
  return (
    <div className=' mx-auto  mt-[150px]  relative '>
      <div className='absolute -top-40  left-0 w-[100px]'>
        <Image src={Vector} alt='Support Us Hero' layout='responsive' />
      </div>
      <div className='text-center max-w-[1104px] mx-auto mb-[100px]'>
        <p className='text-[68px]/[80px] bg-[#fff] morangamd mb-[30px]'>
          Together, we can improve <br /> and build our design community
        </p>
        <p className='text-[20px]/[30px] textgray sfprorg mb-[30px] max-w-[1000px] mx-auto'>
          We’re here to fight brain drain and creative burnout by uplifting design talent through growth, <br />{' '}
          community, purpose, and opportunity. Your support helps shape a stronger future for the industry. 
        </p>
        <div className='flex justify-around max-w-[400px] mx-auto'>
          <button className='py-[14px] px-[24px]rounded rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#005cff] text-[16px]/auto hover:bg-[#337DFF]'>
            Donate Now
          </button>
          <button className='rounded-[24px] border-[0.4px] border-solid w-[183px] h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[16px]'>
            Talk to Us
          </button>
        </div>
      </div>
      <div className='absolute -top-40  right-0 w-[100px]'>
        <Image src={Vector1} alt='Support Us Hero' layout='responsive' />
      </div>
      <div className='flex justify-center text-[#005CFF] mt-[200px]'>
        <MouseIcon />
      </div>
    </div>
  )
}
