'use client'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { useRef } from 'react'
import { Swiper as SwiperType } from 'swiper'

const testimonials = [
  {
    name: 'Name',
    image: 'user1.jpg',
    rating: 5,
    review:
      'allyours has truly transformed how I connect with the design community. Their support and resources helped me grow both professionally and personally, opening doors I never imagined possible.',
  },
  {
    name: 'Name',
    image: 'user2.jpg',
    rating: 4,
    review:
      'allyours has truly transformed how I connect with the design community. Their support and resources helped me grow both professionally and personally, opening doors I never imagined possible.',
  },
  {
    name: 'Name',
    image: 'user3.jpg',
    rating: 5,
    review:
      'allyours has truly transformed how I connect with the design community. Their support and resources helped me grow both professionally and personally, opening doors I never imagined possible.',
  },
  {
    name: 'Name',
    image: 'user4.jpg',
    rating: 3,
    review:
      'allyours has truly transformed how I connect with the design community. Their support and resources helped me grow both professionally and personally, opening doors I never imagined possible.',
  },
  {
    name: 'Name',
    image: 'user5.jpg',
    rating: 4,
    review:
      'allyours has truly transformed how I connect with the design community. Their support and resources helped me grow both professionally and personally, opening doors I never imagined possible.',
  },
]

export default function Carousel() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    
      <div className='relative max-w-[1100px] mx-auto px-[60px] '>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
        slidesPerGroup={1}
        spaceBetween={20}
        className='mx-auto'
        onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}  >
            <div className=' mt-[60px] mb-[10px] md:mb-[65px] h-[242px] max-w-[508px] flex flex-col justify-start gap-[15px] mx-auto'>
              <div className='flex justify-start items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
                  className='size-[40px] md:size-[56px] bg-blue-200 rounded-full mr-0 md:mr-4'
                />
                <div className='text-[14px] md:text-[15px] ml-[10px]'>
                  <p className='sfprorg text-[#f9f9f9]'>{testimonial.name}</p>
                  <p className='sfprorg text-[#f9f9f9]'>Status...</p>
                </div>
              </div>
              <div className='flex mt-1'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`size-[10px] md:size-[20px] ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill='#FDB023'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <div className='text-[14px] md:text-[20px]/[30px] sfprorg text-[#f9f9f9]'>&quot;{testimonial.review}&quot;</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows */}
      <div className='flex justify-center mt-6 space-x-4'>
        <button className='' onClick={() => swiperRef.current?.slidePrev()}>
          <Image
            src='/assets/Icons.SVG/Outline Icons/arrow-circle-left.svg'
            alt='Peekaboo illustration'
            width={58}
            height={58}
            className='swiper-button-prev '
          />
        </button>

        <button onClick={() => swiperRef.current?.slideNext()}>
          <Image
            src='/assets/Icons.SVG/Outline Icons/arrow-circle-right.svg'
            alt='Peekaboo illustration'
            width={58}
            height={58}
            className='swiper-button-next mr-[20px]'
          />
        </button>
      </div>
      <style jsx global>{`
        .swiper-pagination-bullets {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          gap: 8px;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 4px;
          border-radius: 9999px;
          background-color: #d1d5db;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          width: 32px;
          background-color: #fe6835;
        }

        .swiper-button-prev{
          width: 48px !important;
          height: 48px !important;
          margin-left: -40px !important;
        }
        .swiper-button-next {
          width: 48px !important;
          height: 48px !important;
          margin-right: -30px !important;
        }
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 24px !important;
            height: 24px !important;
            
          }
        }

        @media (max-width: 80rem) {
          .swiper-button-prev,
          .swiper-button-next {
            margin: 0px !important;
            
          }
        }
      `}</style>
    </div>
    
  )
}
