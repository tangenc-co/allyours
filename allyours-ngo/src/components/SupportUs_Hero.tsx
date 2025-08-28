'use client'
import Image from 'next/image'
import leftblob from '../../public/assets/Illustration.SVG/leftblob-SupportUs.svg'
import rightblob from '../../public/assets/Illustration.SVG/rightblob-SupportUs.svg'
import tbleftblob from '../../public/assets/Illustration.SVG/tbleftblob-SupportUs.svg'
import tbrightblob from '../../public/assets/Illustration.SVG/tbrightblob-SupportUs.svg'
import MouseIcon from '../../public/assets/IconComponents/IconComponents'
import Upload from '../../public/assets/Icons.SVG/Outline Icons/Upload icon.svg'
import RemoveIcon from '../../public/assets/Icons.SVG/Fill Icons/Vector.svg'
import TickCircle from '../../public/assets/Icons.SVG/Fill Icons/tick-circle.svg'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, ChangeEvent, FormEvent } from 'react'

interface DonatorData {
  donatorName: string
  amount: number
  screenshot: File | null
  isAnonymous: boolean
}
export default function SupportUsHero() {
  const [amountError, setAmountError] = useState<string>('')
  const [fileError, setFileError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [donatorData, setDonatorData] = useState<DonatorData>({
    donatorName: '',
    amount: 0,
    screenshot: null,
    isAnonymous: false,
  })
  console.log(isSubmitting)
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        setFileError('Only JPEG or PNG files are allowed')
        return
      }
      setDonatorData((prev) => ({
        ...prev,
        screenshot: file,
      }))
    }
  }
  const handleRemove = () => {
    setDonatorData((prev) => ({
      ...prev,
      screenshot: null,
    }))
  }
  const handleSwitchChange = (checked: boolean) => {
    setDonatorData((prev) => ({
      ...prev,
      isAnonymous: checked,
    }))
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDonatorData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!donatorData.amount) {
      setAmountError('Amount is required')
    } else if (isNaN(Number(donatorData.amount))) {
      setAmountError('Invalid Amount!')
    } else {
      setAmountError('')
    }
    if (!donatorData.screenshot) {
      setFileError('Payment screenshot is required')
    } else {
      setFileError('')
    }
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('donatorName', donatorData.isAnonymous ? 'Anonymous' : donatorData.donatorName)
      formData.append('amount', donatorData.amount.toString())
      if (donatorData.screenshot) {
        formData.append('screenshot', donatorData.screenshot)
      }

     
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='relative mx-auto md:mt-[100px] overflow-hidden px-4 mt-[50px]'>
      <Image
        src={leftblob}
        alt='Decorative background left blob'
        width={86}
        priority
        className='absolute -top-[90px] left-0 hidden lg:block'
      />
      <Image
        src={tbleftblob}
        alt='Tablet left blob'
        width={44}
        className='absolute -top-[180px] left-0 hidden md:block lg:hidden'
      />
      <div className='text-center max-w-[1104px] mx-auto mb-[80px] py-[32px] md:py-[48px] px-[20px]'>
        <p className='text-[32px] leading-[44px] md:text-[48px] md:leading-[64px] lg:text-[68px] lg:leading-[80px] morangamd mb-[30px]'>
          Together, we can improve <br className='hidden lg:block' /> and build our design community
        </p>
        <p className='text-[14px] leading-[24px] md:text-[16px] md:leading-[28px] lg:text-[20px] lg:leading-[30px] text-[#444444] sfprorg mb-[30px]  tracking-wide'>
          We&apos;re here to fight brain drain and creative burnout by uplifting design talent through growth,{' '}
          <br className='hidden md:block ' />
          community, purpose, and opportunity. Your support helps shape a stronger future for the industry.
        </p>
        <div className='flex flex-row justify-center gap-4 max-w-[400px] mx-auto'>
          <Dialog>
            <DialogTrigger asChild>
              <button className='py-[14px] text-center px-[24px] rounded-[24px] w-[137px] h-[47px] text-white bg-[#005cff] text-[16px] hover:bg-[#337DFF] transition-colors items-center flex justify-center'>
                Donate Now
              </button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px] rounded-lg px-[50px]'>
              {!isSubmitting ? (
                <>
                  <DialogHeader className='mt-5'>
                    <DialogTitle>Be a donator of allyours</DialogTitle>
                    <DialogDescription>Fill the information to donate.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className='grid gap-4'>
                      <div className='grid gap-2'>
                        <label htmlFor='' className='sfprobold text-[#151515] text-[16px] tracking-wide'>
                          Your Name
                        </label>
                        <input
                          type='text'
                          id='donatorName'
                          name='donatorName'
                          placeholder={donatorData.isAnonymous ? 'Anonymous' : 'Enter Your Name'}
                          value={donatorData.isAnonymous ? '' : donatorData.donatorName}
                          onChange={handleInputChange}
                          disabled={donatorData.isAnonymous}
                          className='rounded-[20px] border border-[#B6B6B6] px-4 py-2 focus:outline-none'
                        />
                      </div>
                      <div className='grid gap-2'>
                        <label htmlFor='' className='sfprobold text-[#151515] text-[16px] tracking-wide'>
                          Amount
                        </label>
                        <input
                          type='text'
                          id='amount'
                          name='amount'
                          placeholder='Enter Amount'
                          onChange={handleInputChange}
                          className='rounded-[20px] border border-[#B6B6B6] px-4 py-2 focus:outline-none'
                        />
                        {amountError && <span className='text-red-500 text-sm'>{amountError}</span>}
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          id='isAnonymous'
                          checked={donatorData.isAnonymous}
                          onCheckedChange={handleSwitchChange}
                        />
                        <label
                          htmlFor='Donate Anonymously'
                          className='sfprobold text-[#151515] text-[16px] tracking-wide'
                        >
                          Donate Anonymously
                        </label>
                      </div>
                      {donatorData.screenshot ? (
                        <div className='border border-gray-400 py-2 px-2 flex justify-between'>
                          <span>{donatorData.screenshot.name}</span>
                          <button onClick={handleRemove}>
                            <Image src={RemoveIcon} alt='remove' />
                          </button>
                        </div>
                      ) : (
                        <div className='bg-[#E6EFFF] h-[200px] text-center border-2 border-dashed rounded-xl border-[#005CFF] flex flex-col items-center justify-center space-y-2'>
                          <Image src={Upload} alt='upload' className='w-10 h-10' />
                          <input
                            type='file'
                            className='hidden'
                            id='screenshot-upload'
                            accept='image/jpeg, image/png, image/jpg'
                            onChange={handleImageUpload}
                          />
                          <label className='morangarg text-[20px] cursor-pointer' htmlFor='screenshot-upload'>
                            <u className='textblue'>Upload</u> Payment Screenshot
                          </label>
                          <p className='sfprorg textgray text-[12px] tracking-wider'>Supported formats: JPEG or PNG</p>
                        </div>
                      )}
                      {fileError && <span className='text-red-500 text-sm'>{fileError}</span>}

                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`bg-[#005CFF] rounded-full text-white py-[14px] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Processing...' : 'Continue'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <DialogHeader className='mt-8 flex flex-col items-center text-center space-y-4'>
                    <Image src={TickCircle} alt='Success Icon' className='w-12 h-12' />
                    <DialogTitle className=''> Successfully Donate</DialogTitle>
                    <DialogDescription className='px-12'>
                      Thank you for your donation! Check your email for the certificate.
                    </DialogDescription>
                  </DialogHeader>

                  <div className='mt-6 flex justify-center'>
                    <button className='bg-[#005CFF] hover:bg-[#337DFF] transition-colors text-white  px-6 py-3 rounded-full w-[300px]'>
                       Donation Report
                    </button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          <button className='py-[14px] px-[24px] rounded-[24px] border border-[#B6B6B6] w-[125px] h-[47px] text-[#000] bg-[#F9F9F9] text-[16px] hover:bg-[#f0f0f0] transition-colors  items-center flex justify-center'>
            Talk to Us
          </button>
        </div>
      </div>
      <Image
        src={rightblob}
        alt='Decorative background right blob'
        width={86}
        className='absolute -top-[90px] right-0 hidden lg:block'
      />
      <Image
        src={tbrightblob}
        alt='Tablet right blob'
        width={44}
        className='absolute -top-[140px] right-0 hidden md:block lg:hidden'
      />
      <div className='lg:flex items-center justify-center text-[#005CFF] lg:mt-[150px] hidden  '>
        <MouseIcon />
      </div>
    </div>
  )
}
