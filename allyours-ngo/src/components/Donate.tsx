'use client'

import CheckCircleBlue from '../../public/assets/check-circle-blue.png'
import CheckCirleOrange from '../../public/assets/check-circle-orange.png'
import CheckCirleGreen from '../../public/assets/check-circle-green.png'
import CheckCirlePurple from '../../public/assets/check-circle-purple.png'
import rightChevon from '../../public/assets/Icons.SVG/Outline Icons/chevron-right.svg'
import handmoney from '../../public/assets/handmoney.png'
import messages from '../../public/assets/messages.png'
import Image from 'next/image'
import { useState, type ChangeEvent } from 'react'
import Upload from '../../public/assets/Icons.SVG/Outline Icons/Upload icon.svg'
import RemoveIcon from '../../public/assets/Icons.SVG/Fill Icons/Vector.svg'
import { uploadImageToCloudinary } from '@/services/cloudinary'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { trackDonationIntent, trackSupportCta } from '@/services/analytics'

type TierCard = {
  id: number
  title: string
  descripiton: string
  amount: string
  amountKs: number
  status: string[]
  borderColor: string
  circleIcon: typeof CheckCircleBlue
}

export default function Donate() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<TierCard | null>(null)
  const [donorName, setDonorName] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [fileError, setFileError] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [done, setDone] = useState(false)

  const cards: TierCard[] = [
    {
      id: 1,
      title: 'Ancoor',
      descripiton: '1 Cohorts and 1 Podcast Series',
      amount: '2,400,000',
      amountKs: 2_400_000,
      status: ['Certificate with a seal'],
      borderColor: 'border-t-[#005CFF]',
      circleIcon: CheckCircleBlue,
    },
    {
      id: 2,
      title: 'Advocate',
      descripiton: '4 Cohorts and 2 Podcast Series',
      amount: '5,040,000',
      amountKs: 5_040_000,
      status: ['Certificate with a seal', 'Special Recognition as a Main Partner'],
      borderColor: 'border-t-[#FE6835]',
      circleIcon: CheckCirleOrange,
    },
    {
      id: 3,
      title: 'Ambassador',
      descripiton: '11 Cohorts and 22 Podcast Series',
      amount: '158,400,000',
      amountKs: 158_400_000,
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
      amountKs: 415_200_000,
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

  function openDonate(card: TierCard) {
    setSelected(card)
    setDonorName('')
    setAnonymous(false)
    setMessage('')
    setFormError('')
    setFileError('')
    setScreenshot(null)
    setDone(false)
    setDialogOpen(true)
    trackDonationIntent(card.title)
    trackSupportCta('donate_now')
  }

  function resetDialog(open: boolean) {
    setDialogOpen(open)
    if (!open) {
      setSelected(null)
      setDone(false)
      setFormError('')
      setFileError('')
      setScreenshot(null)
    }
  }

  function handleScreenshotChange(e: ChangeEvent<HTMLInputElement>) {
    setFileError('')
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      setFileError('Only JPEG or PNG files are allowed')
      return
    }
    setScreenshot(file)
  }

  async function submitTierDonation(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    const name = anonymous ? 'Anonymous' : donorName.trim()
    if (!anonymous && !donorName.trim()) {
      setFormError('Enter your name or choose Donate anonymously.')
      return
    }
    if (!screenshot) {
      setFileError('Payment screenshot is required')
      return
    }
    setFormError('')
    setFileError('')
    setSaving(true)
    try {
      const paymentProofUrl = await uploadImageToCloudinary(screenshot)
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          amount: selected.amountKs,
          message: message.trim(),
          donatorType: 'Corporate Donator',
          rank: selected.title,
          source: 'tier',
          paymentProofUrl,
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setFormError(data.error || 'Could not save. Try again.')
        setSaving(false)
        return
      }
      setDone(true)
    } catch {
      setFormError('Upload or network error. Try again.')
    }
    setSaving(false)
  }

  return (
    <div className=' md:mt-[100px] lg:mt-[150px] max-w-7xl w-full px-5 mx-auto'>
      <Dialog open={dialogOpen} onOpenChange={resetDialog}>
        <DialogContent className='sm:max-w-[480px] rounded-lg'>
          {selected && !done ? (
            <>
              <DialogHeader>
                <DialogTitle>Donate — {selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.amount} Ks · You will appear in the public donor report only after an admin approves it.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submitTierDonation} className='grid gap-4 mt-2'>
                <label className='grid gap-1 text-sm'>
                  <span className='font-medium text-[#151515]'>Your name</span>
                  <input
                    type='text'
                    value={anonymous ? '' : donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    disabled={anonymous}
                    placeholder={anonymous ? 'Anonymous' : 'Your name'}
                    className='rounded-[16px] border border-[#B6B6B6] px-3 py-2'
                  />
                </label>
                <div className='flex items-center gap-2'>
                  <Switch id='anon-tier' checked={anonymous} onCheckedChange={setAnonymous} />
                  <label htmlFor='anon-tier' className='text-sm font-medium'>
                    Donate anonymously
                  </label>
                </div>
                <label className='grid gap-1 text-sm'>
                  <span className='font-medium text-[#151515]'>Message (optional)</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className='rounded-[16px] border border-[#B6B6B6] px-3 py-2 resize-none'
                  />
                </label>
                <div className='grid gap-1 text-sm'>
                  <span className='font-medium text-[#151515]'>Payment screenshot</span>
                  {screenshot ? (
                    <div className='border border-gray-300 rounded-[16px] py-2 px-3 flex justify-between items-center'>
                      <span className='truncate text-sm'>{screenshot.name}</span>
                      <button type='button' onClick={() => setScreenshot(null)} aria-label='Remove file'>
                        <Image src={RemoveIcon} alt='Remove file' width={20} height={20} />
                      </button>
                    </div>
                  ) : (
                    <div className='bg-[#E6EFFF] min-h-[120px] border-2 border-dashed rounded-xl border-[#005CFF] flex flex-col items-center justify-center gap-2 py-4'>
                      <Image src={Upload} alt='' className='w-8 h-8' />
                      <input
                        type='file'
                        id='tier-payment-screenshot'
                        className='hidden'
                        accept='image/jpeg,image/png,image/jpg'
                        onChange={handleScreenshotChange}
                      />
                      <label htmlFor='tier-payment-screenshot' className='text-sm cursor-pointer morangarg'>
                        <u className='text-[#005CFF]'>Upload</u> payment proof
                      </label>
                      <p className='text-xs text-gray-500'>JPEG or PNG</p>
                    </div>
                  )}
                  {fileError ? <p className='text-sm text-red-600'>{fileError}</p> : null}
                </div>
                {formError ? <p className='text-sm text-red-600'>{formError}</p> : null}
                <button
                  type='submit'
                  disabled={saving}
                  className='bg-[#005CFF] text-white rounded-full py-3 disabled:opacity-60'
                >
                  {saving ? 'Submitting…' : 'Submit donation record'}
                </button>
              </form>
            </>
          ) : null}
          {selected && done ? (
            <div className='py-4 text-center space-y-3'>
              <DialogTitle>Thank you</DialogTitle>
              <DialogDescription>
                Your {selected.title} tier donation ({selected.amount} Ks) is recorded. An admin will confirm it for the public donor list when appropriate.
              </DialogDescription>
              <button
                type='button'
                className='bg-[#005CFF] text-white rounded-full py-2 px-6'
                onClick={() => resetDialog(false)}
              >
                Close
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <p className='sfprobold mb-4 flex items-center'>
        Support Us <Image src={rightChevon} alt='Peekaboo illustration' width={24} height={22} />
      </p>
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
              <button
                type='button'
                className='bg-[#005CFF] hover:bg-[#337DFF] active:bg-[#0041B5] text-white py-3 px-6 rounded-[24px] w-full flex items-center justify-center'
                onClick={() => openDonate(card)}
              >
                <Image src={handmoney} alt='Donate' width={24} height={24} className='mr-2' />
                Donate Now
              </button>
              <button
                type='button'
                className='mt-4 bg-[#F9F9F9] text-[#151515] py-3 px-6 rounded-[24px] w-full border  border-[#b6b6b6] hover:bg-[#E8E8E8] active:bg-[#B6B6B6]  flex items-center justify-center'
                onClick={() => trackSupportCta('talk_to_us')}
              >
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
