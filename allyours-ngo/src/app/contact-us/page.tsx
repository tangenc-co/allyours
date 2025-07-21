import Image from 'next/image'
import SMS from '../../../public/assets/Illustration.SVG/sms.svg'
import Bag from '../../../public/assets/Illustration.SVG/brifecase-timer.svg'
import Send from '../../../public/assets/Illustration.SVG/send.svg'

export default function ContactUs() {
  return (
    <div className='overflow-x-hidden'>
      <div className='text-center max-w-[1104px] mx-auto mt-[50px] sm:mt-[150px] px-4'>
        <p className='text-[32px]/[40px]  md:text-[58px] lg:text-[68px]/[80px] morangamd mb-[30px] '>How Can We Help You?</p>
        <p className='text-[14px] md:text-lg text-[#444444] sfprorg mb-[30px] max-w-[700px] mx-auto'>
          Reach out to our operation and marketing teams for partnerships, organization and program-related questions
          and event inquiries. Contact us through ways below.
        </p>
      </div>

      <div className='max-w-6xl mx-auto mt-[50px] flex flex-col md:flex-row justify-between gap-5 px-4 md:px-6'>
        <div className='w-full md:w-[50%] rounded-lg bg-white p-6 md:p-8 shadow-xl flex flex-col gap-5'>
          <div className='flex gap-2 items-center'>
            <Image src={SMS} alt='sms icon' />
            <p className='text-[#005CFF] sfprobold text-xl md:text-2xl'>Send Mail</p>
          </div>
          <p className='text-[#444444] sfprorg text-base lg:text-lg leading-relaxed'>
            I&apos;d love to connect with you through email for a detailed conversation. Feel free to send a message
            anytime.
          </p>
          <button className='py-[14px] px-[24px] rounded-[24px] w-[155px] h-[47px] cursor-pointer text-white bg-[#005cff] text-[16px] hover:bg-[#337DFF]'>
            Send Message
          </button>
        </div>

        <div className='w-full md:w-[50%] rounded-lg bg-white p-6 md:p-8 shadow-xl flex flex-col gap-5'>
          <div className='flex gap-2 items-center'>
            <Image src={Bag} alt='bag icon' />
            <p className='text-[#005CFF] sfprobold text-xl md:text-2xl'>Book A Meeting</p>
          </div>
          <p className='text-[#444444] sfprorg text-base lg:text-lg leading-relaxed'>
            I&apos;d love to book a meeting for a more specific discussion. Please let me know a convenient time that
            works for you.
          </p>
          <button className='py-[14px] px-[24px] rounded-[24px] w-[155px] h-[47px] cursor-pointer text-white bg-[#005cff] text-[16px] hover:bg-[#337DFF]'>
            Book Now
          </button>
        </div>
      </div>
      <div className='bg-[#005CFF] mt-[50px] py-12 md:py-20'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row  md:gap-4 lg:gap-8  px-4  '>
          <div className='text-[#f9f9f9] w-full md:w-1/2 flex flex-col gap-4 md:px-6  '>
            <p className='text-xl lg:text-2xl sfpromd italic'>Marketing Team</p>
            <p className='sfprorg text-sm lg:text-base  md:max-w-[380px] lg:max-w-[450px]'>
              Have questions or need support? Reach out to our marketing team directly. We&apos;re here to help with
              inquiries, collaborations, and anything you need to move forward.
            </p>
            <div className='flex items-center gap-2'>
              <p className='sfprorg text-[16px]'>Contact Us</p>
              <Image src={Send} alt='send icon' />
            </div>
          </div>
          <br />
          <div className='text-[#f9f9f9] w-full md:w-1/2 flex flex-col gap-4 md:px-4'>
            <p className='text-xl lg:text-2xl sfpromd italic'>Operation Team</p>
            <p className='sfprorg text-sm lg:text-base  md:max-w-[300px] lg:max-w-[380px]'>
              Need help with processes or requests? Contact our operations team directly, we&apos;re here to assist you
              efficiently.
            </p>
            <div className='flex items-center gap-2'>
              <p className='sfprorg text-[16px]'>Contact Us</p>
              <Image src={Send} alt='send icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
