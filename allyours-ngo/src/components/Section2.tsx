import Carousel from './subcomponents/Carousel'
import Image from 'next/image'
import joinwithus from '../../public/assets/Images/joinwithus.png'
import leftblob from '../../public/assets/Illustration.SVG/leftblob.svg'
import rightblob from '../../public/assets/Illustration.SVG/rightblob.svg'

export default function Section2() {
  return (
    <div className='min-h-screen relative'>
      <Image src={leftblob} alt='left blob' width={196} height={196} className='absolute' />
      
      <div className='flex flex-col items-center lg:flex-row justify-around max-w-[1121px] min-h-[374px] mx-auto'>
        <div>
          <div>
            <p className='w-[188px] h-[22px] sfprobold'>Join With Us </p>
            <p className='text-[48px] mb-[30px] font-[500] text-[#005cff] morangamd'>For you and for all of us</p>
          </div>

          <Image src={joinwithus} alt='Peekaboo illustration' width={0} height={0} className='w-full h-[240px] rounded-[24px]' />
        </div>

        <div className='max-w-[545px] h-[341px]'>
          <div>
            <p className='textgray text-[20px]/[30px] font-[400px] mb-[45px] sfprorg'>
              Our main purpose is to establish a meaningful network and empower small project leaders to flourish,
              connect, and grow together. A creative community where people don’t have to do it all alone.
            </p>
            <div className='flex justify-around mb-[20px]'>
              <div className='max-w-[200px] h-[110px] px-[8px]'>
                <p className='text-[48px] font-[500] morangamd'>90%</p>
                <p className='textgray text-[16px] max-w-[170px] sfprorg'>Participants satisfaction confirmed</p>
              </div>

              <div className='max-w-[200px] h-[110px] px-[8px]'>
                <p className='text-[48px] font-[500] morangamd'>30%</p>
                <p className='textgray text-[16px] max-w-[170px] sfprorg'>
                  Increase in attendees compared to last year.
                </p>
              </div>

              <div className='max-w-[200px] h-[110px] px-[8px]'>
                <p className='text-[48px] font-[500] morangamd'>10%</p>
                <p className='textgray text-[16px] max-w-[170px] sfprorg'>POf visitors keep coming back.</p>
              </div>
            </div>
          </div>

          <div className='flex justify-around max-w-[350px] gap-[24px]'>
            <button className='py-[10px] px-[14px] rounded rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#005cff] text-[16px]/auto'>
              Join Our Programs
            </button>
            <button className='rounded-[24px] border-[1px] border-[#b6b6b6] w-[143px] h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[16px]'>
              Know Details
            </button>
          </div>
        </div>
        <Image src={rightblob} alt='right blob' width={196} height={196} className='absolute right-0' />
      </div>
      

      <div className='bg-[#005cff]  h-auto w-full mt-[110px] py-[80px]'>
        <div className='max-w-[1200px] mx-auto text-[#f9f9f9] mb-[30px]'>
          <p className='text-[48px] font-[500] morangamd mb-[10px]'>Know the Impact</p>
          <p className='text-[16px] sfpromd '>We meet the expectations of both Attendees and Donors.</p>
        </div>
        <Carousel />
      </div>
    </div>
  )
}
