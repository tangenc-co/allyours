import Carousel from './subcomponents/Carousel'
import Image from 'next/image'
import joinwithus from '../../public/assets/Images/joinwithus.png'
import rightchevon from '../../public/assets/Icons.SVG/Outline Icons/chevron-right.svg'
import leftblob from '../../public/assets/Illustration.SVG/leftblob.svg'
import rightblob from '../../public/assets/Illustration.SVG/rightblob.svg'
import tbleftblob from '../../public/assets/Illustration.SVG/tbleftblob.svg'
import tbrightblob from '../../public/assets/Illustration.SVG/tbrightblob.svg'
import mbleftblob from '../../public/assets/Illustration.SVG/mbleftblob.svg'
import mbrightblob from '../../public/assets/Illustration.SVG/mbrightblob.svg'

export default function Section2() {
  return (
    <div className='min-h-screen relative mt-[120px] xl:mt-[250px]' id="section2">
      <Image src={leftblob} alt='left blob' width={196} height={196} className='absolute hidden xl:block ' />
      <Image src={tbleftblob} alt='left blob' width={56} height={56} className='absolute top-[40px] hidden md:block xl:hidden' />
      <Image src={mbleftblob} alt='left blob' width={20} height={26} className='absolute top-[250px] block md:hidden' />
      
      <div className='flex flex-col items-center xl:flex-row justify-around max-w-[1121px] min-h-[374px] mx-auto xl:items-end'>
        <div className='h-[374px]'>
          <div >
            <p className='text-[14px] md:text-[16px] w-[188px] h-[22px] sfprobold flex items-center mb-[40px]'>Join With Us  <Image src={rightchevon} alt='Peekaboo illustration' width={24} height={22} />
            </p>
            <p className=' text-[24px]/[30px] md:text-[32px] lg:text-[48px] mb-[40px] font-[500] text-[#005cff] morangamd'>For you and for all of us</p>
          </div>

          <Image src={joinwithus} alt='Peekaboo illustration' width={0} height={0} className='w-[325px] md:w-full h-[240px] rounded-[24px]' />
        </div>

        <div className='max-w-[545px] h-[341px] '>
          <div>
            <p className='textgray text-[14px] max-w-[333px] md:max-w-[545px] md:text-[16px] lg:text-[20px]/[30px] font-[400px] xl:mt-0 mb-[20px] sfprorg mx-auto'>
              Our main purpose is to establish a meaningful network and empower small project leaders to flourish,
              connect, and grow together. A creative community where people don&apos;t have to do it all alone.
            </p>
            <div className='flex flex-col md:flex-row items-center md:items-start justify-around mx-auto space-y-[30px] md:space-y-0 mt-[21px]'>
              <div className='max-w-[320px] md:max-w-[200px] h-[110px] px-[8px] text-center lg:text-start mx-auto md:mx-0'>
                <p className='text-[48px] font-[500] morangamd'>90%</p>
                <p className='textgray text-[16px] w-full md:max-w-[150px] sfprorg'>Participants satisfaction confirmed</p>
              </div>

              <div className='max-w-[320px] md:max-w-[200px] h-[110px] px-[8px] text-start md:text-left mx-auto md:mx-0'>
                <p className='text-[48px] font-[500] morangamd'>30%</p>
                <p className='textgray text-[16px] w-full md:max-w-[170px] sfprorg'>
                  Increase in attendees compared to last year.
                </p>
              </div>

              <div className='max-w-[320px] md:max-w-[200px] h-[110px] px-[8px] text-center lg:text-start md:text-left mx-auto md:mx-0'>
                <p className='text-[48px] font-[500] morangamd'>10%</p>
                <p className='textgray text-[16px] w-full md:max-w-[150px] sfprorg'>Of visitors keep coming back.</p>
              </div>
            </div>

          </div>

          <div className='flex flex-col md:flex-row justify-around max-w-[350px] gap-[14px] md:gap-[24px]'>
            <button className='py-[10px] px-[14px]  rounded-[24px] border-none w-full md:w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#005cff] active:bg-[#0041B5] hover:bg-[#337DFF] text-[16px]/auto'>
              Join Our Programs
            </button>
            <button className='rounded-[24px] border-[1px] border-[#b6b6b6] w-full md:w-[143px] h-[47px] cursor-pointer text-[#000] bg-[#fff]  hover:bg-[#E8E8E8] active:bg-[#B6B6B6] text-[16px]'>
              Know Details
            </button>
          </div>
        </div>
        <Image src={rightblob} alt='right blob' width={196} height={196} className='absolute right-0 hidden xl:block' />
        <Image src={tbrightblob} alt='right blob' width={56} height={56} className='absolute right-0 hidden md:block xl:hidden' />
        <Image src={mbrightblob} alt='right blob' width={20} height={26} className='absolute top-[290px] right-0 block md:hidden' />
      </div>
      

      <div className='bg-[#005cff]  h-auto w-full mt-[110px] py-[20px] md:py-[80px]'>
        <div className='max-w-[1070px] mx-auto text-[#f9f9f9] mb-0 md:mb-[30px] pl-[30px]'>
          <p className='text-[24px]/[30px] md:text-[48px] font-[500] morangamd mb-[10px]'>Know the Impact</p>
          <p className='text-[14px] md:text-[16px] sfpromd max-w-[295px]  md:w-auto'>We meet the expectations of both Attendees and Donors.</p>
        </div>
        <Carousel />
      </div>
    </div>
  )
}
