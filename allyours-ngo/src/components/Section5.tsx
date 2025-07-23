import Image from 'next/image'
import curvedline from '../../public/assets/Illustration.SVG/curvedline.svg'
import vcurvedline from '../../public/assets/Illustration.SVG/verticalcurvedline.svg'
import curvedlineshadow from '../../public/assets/Illustration.SVG/curvedlineshadow.svg'
import vcurvedlineshadow from '../../public/assets/Illustration.SVG/verticalcurvedlineshadow.svg'
import rocket from '../../public/assets/Icons.SVG/Fill Icons/Rocket 2.svg'
import path from '../../public/assets/Icons.SVG/Fill Icons/path.svg'
import global from '../../public/assets/Icons.SVG/Fill Icons/global.svg'
export default function Section5() {
  return (
    <>

      <div className='min-h-screen text-center pt-[60px] xl:pt-[112px] flex flex-col items-center xl:mb-[-280px]' id="section5">
        <p className="sfprobold text-[14px] md:text-[16px] mb-[10px] md:mb-[20px]">Art, Design, Education</p>
        <h2 className='text-[24px]/[30px] md:text-[48px]/[64px] morangamd mb-[10px] md:mb-[110px]'>Know Our Vision</h2>

        <div className="relative max-w-[1238px] min-h-[369px] hidden xl:flex ">
          
            <Image src={curvedline} alt='curvedline' width={0} height={48} className='absolute top-10 w-[95%] min-h-[254px] ' />
            <Image src={curvedlineshadow} alt='curvedlineshadow' width={0} height={48} className='absolute z-[-10] top-20 w-[95%] min-h-[254px]' />
        

          <div className='min-w-[410px] relative '>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] bottom-[48px] left-[190px]">
              <Image src={rocket} alt="curvedlineshadow" width={32} height={32} />
            </div>

            <p className="sfpromd text-[250px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute right-0 bottom-[70px]">
              1
            </p>
            <div className='text-start max-w-[397px] pt-[100px]'>
              <h2 className='morangamd text-[24px] text-[#151515] mb-[10px]'>Creative Empowerment</h2>
              <p className='sfprorg text-[20px] textgray'>Empowering creatives and educators from 
                Yangon to Mars through inclusive communities.</p>
            </div>
          </div>

          <div className='min-w-[410px] flex flex-col items-end relative'>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] top-5 left-[185px]">
              <Image src={path} alt="curvedlineshadow" width={32} height={32} />
            </div>


            <p className="sfpromd text-[250px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute right-0 bottom-[-120px]">
              2
            </p>
            <div className='text-start max-w-[397px] absolute bottom-[-10px] right-10 '>
                <h2 className='morangamd text-[24px] text-[#151515] mb-[10px]'>Sustainable Innovation</h2>
                <p className='sfprorg text-[20px] textgray'>Building a net-zero future by fusing 
                creativity, education, and cultural heritage.</p>
              
            </div>
          </div>

          <div className='min-w-[410px] relative'>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] top-[70px] right-[110px]">
              <Image src={global} alt="curvedlineshadow" width={32} height={32} />
            </div>

            <p className="sfpromd text-[250px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute right-0 bottom-[-75px]">
              3
            </p>
            <div className='text-start max-w-[397px] absolute bottom-[30px] pl-[35px]'>
              <h2 className='morangamd text-[24px] text-[#151515] mb-[10px]'>Cultural Synergy</h2>
              <p className='sfprorg text-[20px] textgray pr-[35px]'>Harmonizing communities to thrive 
                with innovation, culture, and education.</p>
            </div>
          </div>

        </div>

{/* responsive */}
<div className="relative max-w-[300px] md:max-w-[1238px] min-h-[962px] flex flex-col items-center justify-around xl:hidden ">
          
            <Image src={vcurvedline} alt='curvedline' width={0} height={0} className=' absolute left-1/4.5 max-w-[317px] min-h-[762px]' />
            <Image src={vcurvedlineshadow} alt='curvedlineshadow' width={0} height={0} className='hidden md:block absolute z-[-10] left-0 w-[338px] min-h-[762px] ' />
        

          <div className='min-w-[372px] relative pl-[90px] md:pl-[160px] pb-[200px]'>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] left-[10px] md:left-[50px] top-[30px] xl:top-[10px] ">
              <Image src={rocket} alt="curvedlineshadow" width={32} height={32} />
            </div>

            <p className="sfpromd text-[120px] md:text-[250px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute top-[-70px] right-[30px] md:top-[-190px] md:right-[-70px]">
              1
            </p>
            <div className='text-start max-w-[222px]  md:max-w-[291px]'>
              <h2 className='morangamd text-[16px]/[26px] md:text-[20px]/[26px] text-[#151515] mb-[10px]'>Creative Empowerment</h2>
              <p className='sfprorg text-[14px] textgray'>Empowering creatives and educators from 
                Yangon to Mars through inclusive communities.</p>
            </div>
          </div>

          <div className='min-w-[410px] flex flex-col items-end relative'>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] right-[20px] top-[-160px]">
              <Image src={path} alt="curvedlineshadow" width={32} height={32} />
            </div>


            <p className="sfpromd text-[120px] md:text-[200px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute left-[50px] bottom-[45px] md:left-[-135px] md:bottom-0">
              2
            </p>
            <div className='text-start max-w-[180px] md:max-w-[257px] absolute top-[-180px] left-[120px] md:left-[-20px] '>
                <h2 className='morangamd text-[16px]/[26px] md:text-[20px]/[26px] text-[#151515] mb-[10px]'>Sustainable Innovation</h2>
                <p className='sfprorg text-[14px] textgray'>Building a net-zero future by fusing 
                creativity, education, and cultural heritage.</p>
              
            </div>
          </div>

          <div className='min-w-[410px] relative ml-[80px] mb-[40px]'>
            <div className="absolute size-[54px] bg-[#f9f9f9] border border-[#b6b6b6] z-[10] rounded-[100px] flex items-center justify-center shadow-[0px_25px_60px_0px_#87B3FFCC] top-[-30px] left-[-15px]">
              <Image src={global} alt="curvedlineshadow" width={32} height={32} />
            </div>

            <p className="sfpromd text-[120px] md:text-[200px] bg-[linear-gradient(to_bottom,_#bcbcbc_0%,_transparent_71%)] bg-clip-text text-transparent absolute right-[100px] bottom-[-50px] md:right-[-5px] md:bottom-[-130px]">
              3
            </p>
            <div className='text-start max-w-[222px] md:max-w-[262px] absolute bottom-[-30px] left-[80px] md:left-[100px]'>
              <h2 className='morangamd text-[16px]/[26px] md:text-[20px]/[26px] text-[#151515] mb-[10px]'>Cultural Synergy</h2>
              <p className='sfprorg text-[14px] textgray pr-[35px]'>Harmonizing communities to thrive 
                with innovation, culture, and education.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
