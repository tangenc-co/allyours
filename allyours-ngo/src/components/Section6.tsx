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
    { name: 'Laixen', image: avatar2, role:'role', link:'https://linkedin.com' },
    { name: 'Chaw Hsu', image: avatar1, role:'role', link:'https://linkedin.com' },
    { name: 'Marie Khine', image: avatar3, role:'role', link:'https://linkedin.com' },
    { name: 'Ei Phyu Sin Win (Cathryn)', image: avatar4, role:'role', link:'https://linkedin.com' },
    { name: 'Hein Htet Kyaw', image: avatar5, role:'role', link:'https://linkedin.com' },
    { name: 'Eris', image: avatar4, role:'role', link:'https://linkedin.com' },
    { name: 'Theint', image: avatar, role:'role', link:'https://linkedin.com' },
    { name: 'May Lawoon Lwin', image: avatar2, role:'role', link:'https://linkedin.com' },
    { name: 'Agnes', image: avatar5, role:'role', link:'https://linkedin.com' },
    { name: 'Khine Nwe Linn', image: avatar2, role:'role', link:'https://linkedin.com' },
    { name: 'Ko Zie', image: avatar3, role:'role', link:'https://linkedin.com' },
    { name: 'Ko Nu', image: avatar1, role:'role', link:'https://linkedin.com' },
  ]

  return (
    <>
      <div className='text-center min-h-[352px] py-[72px] bg-[#005CFF] flex flex-col items-center justify-around'>
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
      <div className='text-center py-[74px] md:py-[94px] flex flex-col items-center' id="section6">
        <p className='font-[600] text-[16px] mb-[15px]'>We Bring the Impacts</p>
        <h2 className='morangamd text-[32px]/[40px] lg:text-[48px]/[64px] mb-[60px]'>Our Team Members</h2>

        <div className='mx-[10px] md:mx-[20px]'>
          <div className='flex flex-wrap items-center justify-center max-w-[1170px] gap-[44px] md:gap-[64px]'>
            {/* {members.map((member, index) => (
              <div key={index} className='flex items-center justify-start w-[145px] md:w-[244px] '>
                <Image src={member.image} alt='Peekaboo illustration' width={56} height={56} className="size-[40px] md:size-[56px]"/>
                <span className='text-[14px] md:text-[16px] sfprorg font-[700] w-[100%] ml-[5px] md:ml-[20px] text-start'>{member.name}</span>
              </div>
            ))} */}
            {members.map((member, index) => (
  <div
    key={index}
    className="relative group flex items-center justify-start w-[145px] md:w-[244px]"
  >
    {/* Avatar + Name (always visible) */}
    <Image
      src={member.image}
      alt={member.name}
      width={56}
      height={56}
      className="size-[40px] md:size-[56px] rounded-full cursor-pointer"
    />
    <span className="text-[14px] md:text-[16px] sfprorg font-[700] w-[100%] ml-[5px] md:ml-[20px] text-start">
      {member.name}
    </span>

    {/* Tooltip Card (hover, stays when hovered) */}
    <div className="absolute left-2/3 -translate-x-1/2 top-[60px] opacity-0 group-hover:opacity-100 transition duration-300 z-[100]">
      <div className="flex items-center bg-[#005CFF] text-white rounded-2xl shadow-lg p-4 w-[260px] xl:w-[326px]">
        {/* Avatar inside tooltip */}
        <Image
          src={member.image}
          alt={member.name}
          width={60}
          height={60}
          className="rounded-full"
        />

        {/* Info */}
        <div className="ml-4 flex-1 text-start">
          <h4 className="font-bold text-[16px] sfprorg">{member.name}</h4>
          <p className="text-[16px] opacity-90">{member.role}</p>
        </div>

        {/* LinkedIn Icon */}
        <div className="pl-3 border-l border-white/50 flex items-center min-h-[50px]">
          <a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
))}


          </div>
          <div className='flex items-center gap-[10px] md:gap-[20px] mt-[55px] ml-[30px] md:ml-0'>
            <Image
              src={plus}
              alt='Peekaboo illustration'
              width={56}
              height={56}
              className='bg-[#005cff] p-[5px] rounded-[30px] cursor-pointer'
            />
            <span className='sfprobold text-[16px]'>Click To Apply</span>
          </div>
        </div>
      </div>
      <div className='min-h-[300px] bg-[#005CFF] text-start py-[44px] md:py-[92px] flex flex-col items-center w-full px-[32px] lg:px-[92px]'>
        <div className='max-w-[337px] sm:max-w-[1256px] flex flex-col gap-[32px] text-[#f9f9f9] text-start'>
          <h2 className='morangamd text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px]'>Know Our Achievements</h2>
          <p className='sfprorg text-[14px] md:text-[18px]/[40px] lg:text-[20px]/[30px]'>
            Download and explore our journey of past achievements and the meaningful impact we&apos;ve made in communities.
            From empowering youth and fostering inclusive growth to creating real opportunities for change, our
            milestones reflect a shared commitment to building a brighter, sustainable futures for creative
            industry.{' '}
          </p>
          <button className='bg-[#FE6835] hover:bg-[#FE865D] active:bg-[#B44A26] rounded-[24px]  border-[1px] border-[#fff] w-[187px] flex items-center gap-[8px] py-[14px] px-[24px] cursor-pointer'>
            <Image src={document} alt='pdf' width={24} height={24} />
            <span className='sfprorg text-[16px] text-[#f9f9f9]'>Download PDF</span>
          </button>
        </div>
      </div>
    </>
  )
}
