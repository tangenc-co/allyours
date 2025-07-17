import Image from 'next/image'
import house from '../../public/assets/Icons.SVG/Two Tone Icons/house-2.svg'
import emoji from '../../public/assets/Icons.SVG/Two Tone Icons/emoji-normal.svg'
import coffee from '../../public/assets/Icons.SVG/Two Tone Icons/coffee.svg'
import avatar from '../../public/assets/Images/Avatar.png'
import avatar1 from '../../public/assets/Images/Avatar 1.png'
import avatar2 from '../../public/assets/Images/Avatar2.png'
import avatar3 from '../../public/assets/Images/Avatar3.png'
import avatar4 from '../../public/assets/Images/Avatar4.png'
import avatar5 from '../../public/assets/Images/Avatar5.png'
import plus from '../../public/assets/Icons.SVG/Outline Icons/add.svg'
import document from '../../public/assets/Icons.SVG/Outline Icons/document-download.svg'

export default function Section6() {
  const members = [
    { name: 'Laixen', image: avatar2 },
    { name: 'Chaw Hsu', image: avatar1 },
    { name: 'Marie Khine', image: avatar3 },
    { name: 'Ei Phyu Sin Win (Cathryn)', image: avatar4 },
    { name: 'Hein Htet Kyaw', image: avatar5 },
    { name: 'Eris', image: avatar4 },
    { name: 'Theint', image: avatar },
    { name: 'May Lawoon Lwin', image: avatar2 },
    { name: 'Agnes', image: avatar5 },
    { name: 'Khine Nwe Linn', image: avatar2 },
    { name: 'Ko Zie', image: avatar3 },
    { name: 'Ko Nu', image: avatar1 },
  ]

  return (
    <>
      <div className='bg-[##005CFF] text-center min-h-[352px] py-[72px] bg-[#005CFF] flex flex-col items-center justify-around'>
        <h2 className='text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px] morangamd text-[#f9f9f9] mb-[35px]'>Know Our Mission</h2>
        <div className='flex flex-col lg:flex-row gap-[44px] md:gap-[64px]'>
          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={house} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>

          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={emoji} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>
          <div className='text-center text-[#f9f9f9] max-w-[376px] min-h-[180px] flex flex-col items-center justify-evenly '>
            <Image src={coffee} alt='Peekaboo illustration' width={48} height={48} className='text-center' />
            <h3 className='morangamd text-[20px]/[26px] md:text-[24px]'>Co Working Space</h3>
            <p className='sfpromd text-[14px] lg:text-[16px] mx-[20px] md:mx-auto'>
              Fostering collaboration and creativity by connecting project leaders with real industry exposure
            </p>
          </div>
        </div>
      </div>
      <div className='text-center py-[74px] md:py-[94px] flex flex-col items-center'>
        <p className='font-[600] text-[16px] mb-[15px]'>We Bring the Impacts</p>
        <h2 className='morangamd text-[32px]/[40px] lg:text-[48px]/[64px] mb-[60px]'>Our Team Members</h2>

        <div className='mx-[10px] md:mx-[20px]'>
          <div className='flex flex-wrap items-center justify-center max-w-[1170px] gap-[44px] md:gap-[64px]'>
            {members.map((member, index) => (
              <div key={index} className='flex items-center justify-start w-[145px] md:w-[244px] '>
                <Image src={member.image} alt='Peekaboo illustration' width={56} height={56} className="size-[40px] md:size-[56px]"/>
                <span className='text-[14px] md:text-[16px] sfprorg font-[700] w-[100%] ml-[5px] md:ml-[20px] text-start'>{member.name}</span>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-[10px] md:gap-[20px] mt-[55px] ml-[30px] md:ml-0'>
            <Image
              src={plus}
              alt='Peekaboo illustration'
              width={35}
              height={35}
              className='bg-[#005cff] p-[5px] rounded-[30px] cursor-pointer'
            />
            <span className='sfprobold text-[16px]'>Click To Apply</span>
          </div>
        </div>
      </div>
      <div className='min-h-[300px] bg-[#005CFF] text-start py-[44px] md:py-[92px] flex flex-col items-center w-full px-[20px]'>
        <div className='max-w-[337px] sm:max-w-[1256px] flex flex-col gap-[32px] text-[#f9f9f9] text-start'>
          <h2 className='morangamd text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px]'>Know Our Achievements</h2>
          <p className='sfprorg text-[14px] md:text-[18px]/[40px] lg:text-[20px]/[30px]'>
            Download and explore our journey of past achievements and the meaningful impact we've made in communities.
            From empowering youth and fostering inclusive growth to creating real opportunities for change, our
            milestones reflect a shared commitment to building a brighter, sustainable futures for creative
            industry.{' '}
          </p>
          <button className='bg-[#FE6835] rounded-[24px]  border-[1px] border-[#fff] w-[187px] flex items-center gap-[8px] py-[14px] px-[24px] cursor-pointer'>
            <Image src={document} alt='pdf' width={24} height={24} />
            <span className='sfprorg text-[16px] text-[#f9f9f9]'>Download PDF</span>
          </button>
        </div>
      </div>
    </>
  )
}
