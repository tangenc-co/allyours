'use client'

import Donate from '@/components/Donate'
import DonateReport from '@/components/DonateReport'
import Table from '@/components/subcomponents/Table'
import SupportUsHero from '@/components/SupportUs_Hero'
export default function SupportUs() {
  return (
    <div className='min-h-screen mt-0 '>
      <SupportUsHero />
      <Donate />
      <DonateReport />
      <Table/>
    </div>
  )
}
