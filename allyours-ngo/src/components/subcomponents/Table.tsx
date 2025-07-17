'use client'
import { useState } from 'react'


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
]

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const totalPages = Math.ceil(donators.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentDonators = donators.slice(startIndex, startIndex + rowsPerPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const renderPageNumbers = () => {
    const pages = []

    if (totalPages <= 5) {
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
          <span key={index} className='px-3 py-1 text-gray-500'>
            ...
          </span>
        )
      }
      return (
        <button
          key={index}
          onClick={() => typeof page === 'number' && goToPage(page)}
          className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          {page}
        </button>
      )
    })
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='w-full max-w-7xl'>
        <table className='w-full border border-gray-200 rounded-lg shadow-md overflow-hidden'>
          <thead className='bg-blue-100 text-blue-700'>
            <tr>
              <th className='py-4 px-6 text-left'>Donator Name</th>
              <th className='py-4 px-6 text-left'>Donator Type</th>
              <th className='py-4 px-6 text-left'>Donated Amount</th>
              <th className='py-4 px-6 text-left'>Donator Ranks</th>
            </tr>
          </thead>
          <tbody>
            {currentDonators.map((donator, idx) => (
              <tr key={donator.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='py-3 px-6'>{donator.name}</td>
                <td className='py-3 px-6'>{donator.type}</td>
                <td className='py-3 px-6'>${donator.amount}</td>
                <td className='py-3 px-6'>{donator.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className='flex justify-center mt-4 gap-2 items-center'>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50'
          >
            &lt;
          </button>

          {renderPageNumbers()}
        
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50'
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
