export default function Growth() {
  const GrowthData = [
    {
      id: 1,
      percentage: '30%',
      text: 'Programs Complication ',
    },
    {
      id: 2,
      percentage: '50%',
      text: 'Volunteer Growth Increase',
    },
    {
      id: 3,
      percentage: '10%',
      text: 'Increase in Donor',
    },
  ]

  return (
    <section className='py-[44px] md:py-[92px] px-5 mt-16 mb-16 max-w-7xl mx-auto'>
     
      <div className='max-w-5xl flex flex-col gap-3 text-[#151515] text-start'>
        <p className='sfprobold md:text-[16px] text-[14px]'>Growth of allyours</p>
        <h2 className='morangamd text-[24px] md:text-[32px] lg:text-[48px] leading-snug'>
          The growth of allyours in a year.
        </h2>
        <p className='sfprorg text-[#444444] text-[14px] md:text-[20px] md:leading-[30px] tracking-wide'>
          Over the past year, Allyours has expanded its reach and strengthened its impact, building a vibrant community
          and creating meaningful opportunities for growth, collaboration, and lasting change.
        </p>
      </div>

    
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
        {GrowthData.map((item) => (
          <div key={item.id} className='border-l border-neutral-500 pl-6 text-[#151515] flex flex-col gap-2'>
            <p className='morangamd text-[48px] md:text-[68px] leading-[1]'>{item.percentage}</p>
            <p className='sfprobold text-[18px] md:text-[20px]'>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
