import Image from 'next/image'
import playbutton from '../../public/assets/Icons.SVG/Fill Icons/play-circle.svg'

export default function Section4() {
  return (
    <div className='w-full h-auto bg-[#F7E8FF] py-[88px]'>
      <div className='text-center max-w-[800px] mx-auto'>
        <h1 className='text-[48px]/[64px] text-[#AA16FF] morangarg'>Podcast program for art and design</h1>
        <p className='text-[20px]/[30px] textgray mt-[35px] sfprorg'>
          Inspiring stories from creatives in the industry, Insights from the world of art and design: Peekaboo Podcast
          breaks through to fire your imagination. Tune in and join the creative conversation now.{' '}
        </p>
      </div>
      <div className='max-w-[1102px] mx-auto flex flex-col gap-[15px] justify-around mt-[68px] morangarg'>
        Listen full episode on YouTube
        <div className='grid grid-cols-2 gap-[30px] gap-x-[20px]'>
          <div className='w-[490px] max-h-[162px] rounded-[24px] p-[24px] bg-[#F9F9F9] flex border border-[#b6b6b6] '>
            <Image
              src='/assets/Images/peekaboo Image 1.jpg'
              alt='sample'
              width={109}
              height={109}
              className='mr-[10px] mt-[2px] rounded-[16px]'
            />
            <div className='relative flex flex-col justify-between w-[334px] ml-[10px]'>
              <h2 className='text-[20px]/[26px] text-[#151515] max-w-[302px] morangarg'>
                Perspective of an Burma Illustrator: Meet Ko Harley Aung
              </h2>
              <p className='text-[16px] sfpromd'>Host By Ko Nu</p>
              <p className='text-[16px] text-[#aa16ff] sfpromd'>02:10 Mins</p>
              <Image
                src={playbutton}
                alt='Peekaboo illustration'
                width={48}
                height={48}
                className='absolute right-[0px] bottom-[0px]'
              />
            </div>
          </div>

          <div className='w-[490px] max-h-[162px] rounded-[24px] p-[24px] bg-[#F9F9F9] flex border border-[#b6b6b6]'>
            <Image
              src='/assets/Images/peekaboo Image 1.jpg'
              alt='sample'
              width={109}
              height={109}
              className='mr-[10px] mt-[2px] rounded-[16px]'
            />
            <div className='relative flex flex-col justify-between w-[334px] ml-[10px]'>
              <h2 className='text-[20px]/[26px] text-[#151515] max-w-[302px]'>
                Perspective of an Burma Illustrator: Meet Ko Harley Aung
              </h2>
              <p className='text-[16px]'>Host By Ko Nu</p>
              <p className='text-[16px] text-[#aa16ff]'>02:10 Mins</p>
              <Image
                src={playbutton}
                alt='Peekaboo illustration'
                width={48}
                height={48}
                className='absolute right-[0px] bottom-[0px]'
              />
            </div>
          </div>

          <div className='w-[490px] max-h-[162px] rounded-[24px] p-[24px] bg-[#F9F9F9] flex border border-[#b6b6b6]'>
            <Image
              src='/assets/Images/peekaboo Image 1.jpg'
              alt='sample'
              width={109}
              height={109}
              className='mr-[10px] mt-[2px] rounded-[16px]'
            />
            <div className='relative flex flex-col justify-between w-[334px] ml-[10px]'>
              <h2 className='text-[20px]/[26px] text-[#151515] max-w-[302px]'>
                Perspective of an Burma Illustrator: Meet Ko Harley Aung
              </h2>
              <p className='text-[16px]'>Host By Ko Nu</p>
              <p className='text-[16px] text-[#aa16ff]'>02:10 Mins</p>
              <Image
                src={playbutton}
                alt='Peekaboo illustration'
                width={48}
                height={48}
                className='absolute right-[0px] bottom-[0px]'
              />
            </div>
          </div>

          <div className='w-[490px] max-h-[162px] rounded-[24px] p-[24px] bg-[#F9F9F9] flex border border-[#b6b6b6]'>
            <Image
              src='/assets/Images/peekaboo Image 1.jpg'
              alt='sample'
              width={109}
              height={109}
              className='mr-[10px] mt-[2px] rounded-[16px]'
            />
            <div className='relative flex flex-col justify-between w-[334px] ml-[10px] '>
              <h2 className='text-[20px]/[26px] text-[#151515] max-w-[302px]'>
                Perspective of an Burma Illustrator: Meet Ko Harley Aung
              </h2>
              <p className='text-[16px]'>Host By Ko Nu</p>
              <p className='text-[16px] text-[#aa16ff]'>02:10 Mins</p>
              <Image
                src={playbutton}
                alt='Peekaboo illustration'
                width={48}
                height={48}
                className='absolute right-[0px] bottom-[0px]'
              />
            </div>
          </div>
        </div>
        <div className='mx-auto flex items-center mt-[24px]'>
          <button className='py-[10px] px-[14px] rounded rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#AA16FF] text-[16px]/auto mx-auto sfprorg'>
            View On YouTube
          </button>
        </div>
      </div>
    </div>
  )
}
