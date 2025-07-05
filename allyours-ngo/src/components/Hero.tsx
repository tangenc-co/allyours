import Image from 'next/image'
export default function Hero() {
  return (
    <div className='min-h-screen max-w-[1213px] mx-auto'>
      <div className='text-center mt-[50px] max-w-[1104px] mx-auto mb-[100px]'>
        <p className='text-[68px]/[80px] mb-[-10px] morangamd mb-[30px]'>
          Cultivating Creative Minds Retaining Design Intelligence
        </p>
        <p className='text-[20px]/[30px] textgray sfprorg mb-[30px]'>
          We’re on a mission to cherish and elevate design talent by tackling brain drain and creative burnout through
          skill growth, community support and meaningful purposes. Let’s shape a stronger future for the industry,
          beginning from today. 
        </p>
        <div className='flex justify-around max-w-[400px] mx-auto'>
          <button className='py-[10px] px-[14px] rounded rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#005cff] text-[16px]/auto'>
            Join Our Programs
          </button>
          <button className='rounded-[24px] border-[1px] border-solid border-[#b6b6b6] w-[183px] h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[16px]'>
            Learn More
          </button>
        </div>
      </div>
      <div className='mx-auto max-w-[1304px] mx-auto flex justify-around'>
        <div>
          <div className='flex justify-start items-center ml-[40px] mb-[30px]'>
            <div className='w-[6px] h-[24px] bg-gradient-to-b from-[#0a6599] to-[#11a8ff] mr-[8px]'></div>
            <p className='text-[#fff] sfpromd textgray'>for you and for all of us</p>
          </div>
          <Image
            src='/assets/Illustration.SVG/for you and for all of us.png'
            alt='Peekaboo illustration'
            width={329.92}
            height={329.92}
            className="transition-transform duration-300 hover:rotate-[15deg]"
          />
        </div>
        <div>
          <div className='flex justify-start items-center ml-[40px] mb-[30px] '>
            <div className='w-[6px] h-[24px] bg-gradient-to-b from-[#995222] to-[#ff8838] mr-[8px]'></div>
            <p className='text-[#fff] sfpromd textgray'>Peekaboo Design Events</p>
          </div>
          <Image
            src='/assets/Illustration.SVG/Peekaboo.png'
            alt='Peekaboo illustration'
            width={329.92}
            height={329.92}
            className="transition-transform duration-300 hover:rotate-[15deg]"
          />
        </div>
        <div>
          <div className='flex justify-start items-center ml-[40px] mb-[30px]'>
            <div className='w-[6px] h-[24px] bg-gradient-to-b from-[#007d50] to-[#00e391] mr-[8px]'></div>
            <p className='text-[#fff] sfpromd textgray'>Podcast of Peekaboo</p>
          </div>
          <Image
            src='/assets/Illustration.SVG/podcast.png'
            alt='Peekaboo illustration'
            width={349.92}
            height={349.92}
            className="transition-transform duration-300 hover:rotate-[15deg]"
          />
        </div>
      </div>
    </div>
  )
}
