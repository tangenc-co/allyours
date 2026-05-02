'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import playbutton from '../../public/assets/Icons.SVG/Fill Icons/play-circle.svg'

const DEFAULT_THUMB = '/assets/Images/peekaboo Image 1.jpg'

export type PodcastEpisode = {
  id: string
  title: string
  hostname: string
  duration: string
  thumbnail: string
  youtubeUrl: string
}

export default function Section4() {
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([])
  const [loaded, setLoaded] = useState(false)

  const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL?.trim() || 'https://www.youtube.com'

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch('/api/podcasts', { cache: 'no-store' })
        if (!res.ok) {
          if (active) setLoaded(true)
          return
        }
        const data = (await res.json()) as { podcasts?: PodcastEpisode[] }
        if (active) {
          setPodcasts(data.podcasts ?? [])
          setLoaded(true)
        }
      } catch {
        if (active) setLoaded(true)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className='w-full h-auto bg-[#F7E8FF] py-[54px] md:py-[88px]' id='section4'>
      <div className='text-center max-w-[1000px] mx-auto'>
        <h1 className=' text-[24px]/[30px] md:text-[32px]/[40px] xl:text-[48px]/[64px] text-[#AA16FF] morangamd max-w-[230px] md:max-w-[1140px] mx-auto'>
          Podcast program for art and design
        </h1>
        <p className='text-[14px] md:text-[18px]/[24px] xl:text-[20px]/[30px] textgray mt-[35px] sfprorg mx-[20px]'>
          Inspiring stories from creatives in the industry, Insights from the world of art and design: <br /> Peekaboo Podcast
          breaks through to fire your imagination. Tune in and join the creative conversation now.{' '}
        </p>
      </div>
      <div className='max-w-[1102px] mx-auto flex flex-col items-center text-start gap-[15px] justify-around mt-[68px] morangarg'>
        <p className='text-[16px] text-start w-full px-[14px] xl:px-[24px]'>Listen full episode on YouTube</p>

        {!loaded ? (
          <p className='text-[14px] text-[#444] sfprorg px-[14px]'>Loading episodes…</p>
        ) : null}
        {loaded && podcasts.length === 0 ? (
          <p className='text-[14px] text-[#444] sfprorg px-[14px]'>No episodes yet. Add some at /admin/podcasts/new or in the Firebase console.</p>
        ) : null}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[20px] xl:gap-[30px] '>
          {(loaded ? podcasts : []).map((ep) => {
            const thumb = ep.thumbnail?.trim().startsWith('http') ? ep.thumbnail.trim() : DEFAULT_THUMB
            const href = ep.youtubeUrl?.trim() || '#'
            return (
              <a
                key={ep.id}
                href="https://youtu.be/L1Z5PPa1TVM?si=rYBlii9eexrJtC9l"
                target='_blank'
                rel='noopener noreferrer'
                className='w-[353px] xl:w-[520px] max-h-[100px] xl:max-h-[162px] rounded-[24px] p-[14px] xl:p-[24px] bg-[#F9F9F9] flex border border-[#b6b6b6] hover:border-[#AA16FF] transition-colors'
              >
                <Image
                  src={thumb}
                  alt={ep.title}
                  width={109}
                  height={109}
                  unoptimized={thumb.startsWith('http')}
                  className='mr-[10px] mt-[2px] rounded-[16px] size-[48px] xl:size-[109px] object-cover shrink-0'
                />
                <div className='relative flex flex-col w-[334px] ml-[10px] min-w-0'>
                  <h2 className='text-[16px] xl:text-[20px]/[26px] text-[#151515] max-w-[302px] morangarg line-clamp-1 lg:line-clamp-2'>
                    {ep.title}
                  </h2>
                  <p className='text-[14px] mt-[5px] xl:text-[16px] sfpromd'>Host by {ep.hostname}</p>
                  <p className='text-[14px] mt-[5px] xl:text-[16px] text-[#aa16ff] sfpromd'>{ep.duration}</p>
                  <Image
                    src={playbutton}
                    alt='Play on YouTube'
                    width={48}
                    height={48}
                    className='absolute right-0 xl:right-[-20px] bottom-0 pointer-events-none'
                  />
                </div>
              </a>
            )
          })}
        </div>
        <div className='mx-auto flex items-center mt-[24px]'>
          <a
            href="https://youtube.com/@peekaboobyallyours?si=d1Fm4PqQkNtHiznq"
            target='_blank'
            rel='noopener noreferrer'
            className='py-[10px] px-[14px] rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#AA16FF] hover:bg-[#BB45FF] active:bg-[#7910B5] text-[16px]/auto mx-auto sfprorg act inline-flex items-center justify-center no-underline'
          >
            View On YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
