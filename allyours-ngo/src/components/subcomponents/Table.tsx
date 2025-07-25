'use client'
import { useState } from 'react'
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

export default function Table() {
  const donators = [
    { id: 1, name: 'Kyaw Kyaw', type: 'Corporate Donator', amount: 100, rank: 'Advocate' },
    { id: 2, name: 'Anonymous Donor', type: 'Corporate Donator', amount: 100, rank: 'Alliance' },
    { id: 3, name: 'U Shwe Moe', type: 'Free Donator', amount: 100, rank: 'None' },
    { id: 4, name: 'Wai Lin Phyo', type: 'Free Donator', amount: 100, rank: 'Ambassador' },
    { id: 5, name: 'Anonymous Donor', type: 'Free Donator', amount: 100, rank: 'None' },
    { id: 6, name: 'John Doe', type: 'Free Donator', amount: 100, rank: 'None' },
    { id: 7, name: 'Jane Smith', type: 'Corporate Donator', amount: 150, rank: 'Alliance' },
    { id: 8, name: 'Aung Aung', type: 'Free Donator', amount: 50, rank: 'None' },
    { id: 9, name: 'Mya Mya', type: 'Free Donator', amount: 70, rank: 'None' },
    { id: 10, name: 'Moe Moe', type: 'Corporate Donator', amount: 300, rank: 'Advocate' },
    { id: 11, name: 'Tun Tun', type: 'Free Donator', amount: 40, rank: 'None' },
    { id: 12, name: 'Soe Soe', type: 'Corporate Donator', amount: 200, rank: 'Ambassador' },
    { id: 13, name: 'Min Min', type: 'Free Donator', amount: 80, rank: 'None' },
    { id: 14, name: 'Hla Hla', type: 'Corporate Donator', amount: 250, rank: 'Alliance' },
    { id: 15, name: 'Zaw Zaw', type: 'Free Donator', amount: 60, rank: 'None' },
    { id: 16, name: 'Su Su', type: 'Corporate Donator', amount: 180, rank: 'Advocate' },
    { id: 17, name: 'Ko Ko', type: 'Free Donator', amount: 90, rank: 'None' },
    { id: 18, name: 'Nyein Nyein', type: 'Corporate Donator', amount: 220, rank: 'Ambassador' },
    { id: 19, name: 'Thida', type: 'Free Donator', amount: 55, rank: 'None' },
    { id: 20, name: 'Win Win', type: 'Corporate Donator', amount: 275, rank: 'Alliance' },
    { id: 21, name: 'Htun Htun', type: 'Free Donator', amount: 45, rank: 'None' },
    { id: 22, name: 'Khin Khin', type: 'Corporate Donator', amount: 320, rank: 'Advocate' },
    { id: 23, name: 'Aye Aye', type: 'Free Donator', amount: 65, rank: 'None' },
    { id: 24, name: 'Zin Zin', type: 'Corporate Donator', amount: 150, rank: 'Alliance' },
    { id: 25, name: 'Hla Hla', type: 'Free Donator', amount: 75, rank: 'None' },
    { id: 26, name: 'Maung Maung', type: 'Corporate Donator', amount: 400, rank: 'Advocate' },
    { id: 27, name: 'Nanda', type: 'Free Donator', amount: 30, rank: 'None' },
    { id: 28, name: 'Kyaing Kyaing', type: 'Corporate Donator', amount: 500, rank: 'Ambassador' },
    { id: 29, name: 'Zaw Lin', type: 'Free Donator', amount: 120, rank: 'None' },
    { id: 30, name: 'Aung Myint', type: 'Corporate Donator', amount: 600, rank: 'Alliance' },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const totalPages = Math.ceil(donators.length / rowsPerPage)

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
                  <td className='py-3 px-6 border-b border-gray-200 whitespace-nowrap'>${donator.amount}</td>
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
