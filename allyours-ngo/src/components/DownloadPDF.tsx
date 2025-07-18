import Image from 'next/image'
import document from '../../public/assets/Icons.SVG/Outline Icons/document-download.svg'
export default function DownloadPDF() {
  return (
    <div className='min-h-[300px] bg-[#005CFF] text-start py-[44px] md:py-[92px] flex flex-col items-center w-full px-[20px] mt-12'>
      <div className='max-w-[337px] sm:max-w-[1256px] flex flex-col gap-[32px] text-[#f9f9f9] text-start'>
        <h2 className='morangamd text-[24px]/[30px] md:text-[32px]/[40px] lg:text-[48px]/[64px]'>
          Six Months Donation Report
        </h2>
        <p className='sfprorg text-[14px] md:text-[18px]/[40px] lg:text-[20px]/[30px]'>
          Download and explore our six-month journey of progress and impact. With your support, we&apos;ve strengthened
          our organization, empowered communities, and advanced creative initiatives. From fostering inclusive growth to
          opening new opportunities, each step reflects our shared commitment to sustainable change.
        </p>
        <button className='bg-[#FE6835] rounded-[24px]  border-[1px] border-[#fff] w-[187px] flex items-center gap-[8px] py-[14px] px-[24px] cursor-pointer'>
          <Image src={document} alt='pdf' width={24} height={24} />
          <span className='sfprorg text-[16px] text-[#f9f9f9]'>Download PDF</span>
        </button>
      </div>
    </div>
  )
}
