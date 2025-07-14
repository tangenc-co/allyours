import Image from 'next/image'
import Link from 'next/link'
import allyourslogo from '../../public/assets/Images/all yours-01_cropped.png'
import Facebook from '../../public/assets/Icons.SVG/Socials/Facebook.svg'
import Instagram from '../../public/assets/Icons.SVG/Socials/Instagram.svg'
import X from '../../public/assets/Icons.SVG/Socials/X.svg'
import Linkedin from '../../public/assets/Icons.SVG/Socials/Linkedin.svg'
import Youtube from '../../public/assets/Icons.SVG/Socials/Youtube.svg'

export default function Footer(){
    return(
        <div className="w-full bg-[#444444] flex flex-wrap justify-center p-[20px] py-[30px] gap-[54px]">
            
            <div className="w-[500px] flex flex-col space-y-[24px] ">
             
                    <Image src={allyourslogo} alt='Allyours Logo' width={102} height={57} className="py-[5px] bg-[#f9f9f9]   rounded-[24px]"  />
             
                    <p className='morangamd text-[16px]/[26px] md:text-[20px]/[26px] text-[#f9f9f9]'>Join our newsletter to stay up to date on features and releases.</p>
                    <div>
                      <div className='flex justify-start'>
                        <input type="email" className="p-[12px] rounded-[24px] w-[245px] sm:w-[363px] h-[41px] sm:h-[48px] border-[1px] border-[#b6b6b6] text-[14px] sm:text-[16px] text-[#f9f9f9] bg-transparent" placeholder='Enter your email'/>
                        <button className='bg-[#f9f9f9] w-[74px] sm:w-[121px] h-[41px] sm:h-[48px] rounded-[32px] border-[1px] border-[#b6b6b6] py-[8px] sm:px-[24px] text-[14px] sm:text-[16px] sfprorg tracking-wide text-[#151515] ml-[15px]' >Subscribe</button>
                      </div>
                      <p className='text-[#f9f9f9] text-[12px] sfprorg mt-[10px]'>By subscribing you agree to with our <u>Privacy Policy</u> and provide consent to receive updates from our company.</p>
                    </div>
                
            </div>

            <div className="w-[584px] flex flex-wrap gap-[50px] sm:pl-[40px]">
                <div className='flex flex-col space-y-[16px]'>
                  <h2 className='morangarg text-[24px] text-[#f9f9f9]'>Navigation</h2>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Peekaboo
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    For you & all of us
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Podcast
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Our Value
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Support Us
                  </Link>
                </div>

                <div className='flex flex-col space-y-[16px]'>
                  <h2 className='morangarg text-[24px] text-[#f9f9f9]'>Contents</h2>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Team Journey
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Meet the team
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Team JDs
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Our Achievements
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9]" >
                    Become a Volunteer
                  </Link>
                </div>

                <div className='flex flex-col space-y-[16px]'>
                  <h2 className='morangarg text-[24px] text-[#f9f9f9]'>Follow Us</h2>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9] flex " >
                    <Image src={Facebook} alt="fb" width={24} height={24} className="mr-[10px]" /> Facebook
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9] flex " >
                    <Image src={Instagram} alt="fb" width={24} height={24} className="mr-[10px]" /> Instagram
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9] flex " >
                    <Image src={X} alt="fb" width={24} height={24} className="mr-[10px]" /> X
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9] flex " >
                    <Image src={Linkedin} alt="fb" width={24} height={24} className="mr-[10px]" /> LinkedIn
                  </Link>
                  <Link href="/" className="sfprorg text-[16px] text-[#f9f9f9] flex " >
                    <Image src={Youtube} alt="fb" width={24} height={24} className="mr-[10px]" /> YouTube
                  </Link>
                </div>
            </div>

        </div>
    )
}

