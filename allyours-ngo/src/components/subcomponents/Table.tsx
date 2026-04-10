'use client'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import pack from '../../../public/assets/Relume.png'
import Image from 'next/image'

export type DonationRow = {
  id: string
  name: string
  type: string
  amount: number
  rank: string
}

export default function Table() {
  const [donators, setDonators] = useState<DonationRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/donations?report=1', { cache: 'no-store' })
        if (!res.ok) {
          if (active) {
            setDonators([])
            setLoading(false)
          }
          return
        }
        const data = (await res.json()) as { donations?: DonationRow[] }
        if (active) {
          setDonators(data.donations ?? [])
          setLoading(false)
        }
      } catch {
        if (active) {
          setDonators([])
          setLoading(false)
        }
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [donators.length])
  const rowsPerPage = 5
  const totalPages = Math.max(1, Math.ceil(donators.length / rowsPerPage))

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentDonators = donators.slice(startIndex, startIndex + rowsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const renderPageItems = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage, '...', totalPages)
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis className='text-[#005CFF]' />
          </PaginationItem>
        )
      }
      return (
        <PaginationItem key={page}>
          <PaginationLink
            className={`${
              currentPage === page
                ? 'bg-[#005CFF] text-white hover:bg-[#005CFF]/80 hover:text-white'
                : 'bg-white text-[#005CFF]'
            }  rounded-full `}
            onClick={() => handlePageChange(Number(page))}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center mt-10'>
        <p className='text-[#444444] sfprorg'>Loading donors…</p>
      </div>
    )
  }

  if (!donators.length) {
    return (
      <div className='flex flex-col items-center mt-10'>
        <p className='text-[#444444] sfprorg text-center max-w-md'>
          No public donations to show yet. Approved donations appear here after an admin enables &quot;Show in donor report&quot; in{' '}
          <span className='whitespace-nowrap'>/admin/donations</span>.
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='w-full max-w-7xl px-4'>
        <div className='w-full overflow-x-auto touch-auto'>
          <table className='min-w-[600px] w-full'>
            <thead className='text-[#005CFF] border-b border-gray-200 sfpromd '>
              <tr>
                <th className='py-4 px-6 text-left'>Donator Name</th>
                <th className='py-4 px-6 text-left'>Donator Type</th>
                <th className='py-4 px-6 text-left'>Donated Amount</th>
                <th className='py-4 px-6 text-left'>Donator Ranks</th>
              </tr>
            </thead>
            <tbody>
              {currentDonators.map((donator) => (
                <tr key={donator.id}>
                  <td className='py-3 px-6 border-b border-gray-200 whitespace-nowrap'>
                    <Image src={pack} alt={donator.name} className='inline-block mr-2' width={24} height={24} />
                    {donator.name}
                  </td>
                  <td className='py-3 px-6 border-b border-gray-200 whitespace-nowrap'>{donator.type}</td>
                  <td className='py-3 px-6 border-b border-gray-200 whitespace-nowrap'>Ks {donator.amount.toLocaleString()}</td>
                  <td className='py-3 px-6 border-b border-gray-200 whitespace-nowrap'>{donator.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center mt-12'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-[#005CFF] `}
                />
              </PaginationItem>

              {renderPageItems()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-[#005CFF] `}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
