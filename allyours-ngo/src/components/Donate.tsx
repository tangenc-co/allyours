import CheckCircleBlue from '../../public/assets/check-circle-blue.png'
import CheckCirleOrange from '../../public/assets/check-circle-orange.png'
import CheckCirleGreen from '../../public/assets/check-circle-green.png'
import CheckCirlePurple from '../../public/assets/check-circle-purple.png'
import rightChevon from '../../public/assets/Icons.SVG/Outline Icons/chevron-right.svg'
import handmoney from '../../public/assets/handmoney.png'
import messages from '../../public/assets/messages.png'
import Image from 'next/image'

export default function Donate() {
  const cards = [
    {
      id: 1,
      title: 'Ancoor',
      descripiton: '1 Cohorts and 1 Podcast Series',
      amount: '2,400,000',
      status: ['Certificate with a seal'],
      borderColor: 'border-t-[#005CFF]',
      circleIcon: CheckCircleBlue,
    },
    {
      id: 2,
      title: 'Advocate',
      descripiton: '4 Cohorts and 2 Podcast Series',
      amount: '5,040,000',
      status: ['Certificate with a seal', 'Special Recognition as a Main Partner'],
      borderColor: 'border-t-[#FE6835]',
      circleIcon: CheckCirleOrange,
    },
    {
      id: 3,
      title: 'Ambassador',
      descripiton: '11 Cohorts and 22 Podcast Series',
      amount: '158,400,000',
      status: [
        'Certificate with a seal',
        'Special Recognition as a Main Partner',
        'An Exclusive Invitation',
        'A Prominent Feature in Contributors sections',
      ],
      borderColor: 'border-t-[#01E391]',
      circleIcon: CheckCirleGreen,
    },
    {
      id: 4,
      title: 'Alliance',
      descripiton: '33 Cohorts and 16 Podcast Series',
      amount: '415,200,000',
      status: [
        'Main Partner Recognition',
        'Exclusive Invitation',
        'A Permanent Place in the Contributors Section',
        'A Personalized Plaque',
        'A Physical and Digital Version of Our Seal',
      ],
      borderColor: 'border-t-[#AA16FF]',
      circleIcon: CheckCirlePurple,
    },
  ]

  return (
    <div className=' md:mt-[100px] lg:mt-[150px] max-w-7xl w-full px-5 mx-auto'>
      <p className='sfprobold mb-4 flex items-center'>Support Us <Image src={rightChevon} alt='Peekaboo illustration' width={24} height={22} /></p>
      <div className='flex flex-col lg:flex-row justify-between gap-6 mb-[100px]'>
        <p className='text-[30px] lg:text-[48px] leading-[48px] lg:leading-[64px] font-medium text-[#151515] morangamd lg:w-1/2'>
          Specific Donation Can <br className='hidden lg:block' /> Give Huge Impact to Us.
        </p>
        <p className='text-[#444444] sm:text-[14px] md:text-[16px] lg:text-[20px] lg:leading-[30px] lg:w-1/2 tracking-wide'>
          When you choose to contribute, you&apos;ve not just donating, you&apos;ve creating a ripple of change for
          present and future generations. Your journey through the Ascension of Impact lights the way for young minds to
          grow, learn, and contribute, while unlocking their hidden talents and skills.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-full bg-[#F9F9F9] rounded-[8px] p-6 shadow-lg border border-gray-200 border-t ${card.borderColor} flex flex-col justify-between h-[650px]`}
          >
            <div>
              <h3 className='text-[24px] mb-2 morangarg'>{card.title}</h3>
              <p className='text-[#151515] sfprorg'>{card.descripiton}</p>

              <p className='text-[24px] font-bold my-4 sfpromd'>{card.amount} Ks</p>

              <p className='text-[#444444] font-medium sfprorg'>What you get:</p>
           <ul className='mt-4 space-y-3'>
            {card.status.map((item, index) => (
              <li key={index} className='flex items-center text-[#444444] text-[16px]'>
                <Image
                  src={card.circleIcon}
                  alt='Check Icon'
                  width={16}
                  height={16}
                  className='mr-2 w-4 h-4 object-contain'
                />
                {item}
              </li>
            ))}
          </ul>

            </div>

            <div className='flex flex-col items-center sfprorg tracking-[1px] mt-6'>
              <button className='bg-[#005CFF] hover:bg-[#337DFF] active:bg-[#0041B5] text-white py-3 px-6 rounded-[24px] w-full flex items-center justify-center'>
                <Image src={handmoney} alt='Donate' width={24} height={24} className='mr-2' />
                Donate Now
              </button>
              <button className='mt-4 bg-[#F9F9F9] text-[#151515] py-3 px-6 rounded-[24px] w-full border  border-[#b6b6b6] hover:bg-[#E8E8E8] active:bg-[#B6B6B6]  flex items-center justify-center'>
                <Image src={messages} alt='Talk' width={24} height={24} className='mr-2' />
                Talk to Us
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
