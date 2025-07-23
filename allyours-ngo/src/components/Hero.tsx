import Image from 'next/image'
export default function Hero() {
  return (
    <div className='min-h-screen md:min-h-[800px] xl:min-h-screen max-w-[1213px] mx-auto md:mb-[-30vh]'>
      <div className='text-center mt-[50px] max-w-[1104px] mx-auto mb-[100px]'>
        <p className='w-auto text-[32px]/[40px] md:text-[48px]/[64px] lg:text-[68px]/[80px] morangamd mb-[20px] lg:mb-[30px] mx-auto'>
          Cultivating Creative Minds Retaining Design Intelligence
        </p>
        <p className='max-w-[321px] md:max-w-[610px] lg:w-auto text-[14px]/[20px] md:text-[16px] lg:text-[20px]/[30px] textgray sfprorg mb-[30px] textcenter mx-auto'>
          We&apos;re on a mission to cherish and elevate design talent by tackling brain drain and creative burnout through
          skill growth, community support and meaningful purposes. Let&apos;s shape a stronger future for the industry,
          beginning from today.
        </p>
        <div className='flex justify-around max-w-[302px] md:max-w-[400px] mx-auto'>
          <button className='py-[10px] px-[14px]  rounded-[24px] border-none w-[166px] md:w-[183px] h-[45px] md:h-[47px] cursor-pointer text-[#fff] bg-[#005cff] text-[14px] md:text-[16px]/auto'>
            Join Our Programs
          </button>
          <button className='rounded-[24px] border-[1px] border-solid border-[#b6b6b6] w-[120px] md:w-[183px] h-[45px] md:h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[14px] md:text-[16px]'>

            Learn More
          </button>
        </div>
      </div>
      <div className='max-w-[240px] md:max-w-[1304px] mx-auto flex gap-y-[50px] flex-col md:flex-row justify-around'>
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
            className="transition-transform size-[255px] md:size-[215px] lg:size-[329.92px] duration-300 hover:rotate-[15deg]"
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
            className="transition-transform  size-[255px] md:size-[215px] lg:size-[329.92px] duration-300 hover:rotate-[15deg]"
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
            className="transition-transform  size-[255px] md:size-[215px] lg:size-[329.92px] duration-300 hover:rotate-[15deg]"
          />
        </div>
      </div>
    </div>
  )
}
