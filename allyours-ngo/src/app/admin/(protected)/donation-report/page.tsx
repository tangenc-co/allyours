import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { DONATION_REPORT_FS_PATH, DONATION_REPORT_PUBLIC_PATH } from '@/lib/donation-report-static'

export default function AdminDonationReportPage() {
  const filePath = path.join(process.cwd(), 'public', DONATION_REPORT_FS_PATH)
  const fileExists = fs.existsSync(filePath)

  return (
    <div className='mx-auto max-w-lg px-5 py-16 text-[#151515]'>
      <h1 className='text-2xl font-semibold'>Donation report PDF (static file)</h1>
      <p className='mt-2 text-sm leading-relaxed text-[#444]'>
        The download button on the site points at a single file in the repo:{' '}
        <code className='rounded bg-[#eee] px-1 text-xs'>public/{DONATION_REPORT_FS_PATH}</code>. There is no upload in
        admin — replace that file locally, then commit and deploy (or restart <code className='text-xs'>npm run dev</code>
        ).
      </p>

      <div
        className={`mt-6 rounded-lg border px-4 py-3 text-sm ${fileExists ? 'border-green-200 bg-green-50 text-green-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}
        role='status'
      >
        {fileExists ? (
          <p>
            <strong>File found.</strong> Visitors can download it from{' '}
            <Link href={DONATION_REPORT_PUBLIC_PATH} className='font-medium underline' target='_blank' rel='noreferrer'>
              {DONATION_REPORT_PUBLIC_PATH}
            </Link>
            .
          </p>
        ) : (
          <p>
            <strong>No PDF yet.</strong> Add <code className='rounded bg-white/80 px-1'>public/{DONATION_REPORT_FS_PATH}</code>{' '}
            to enable the download buttons on the homepage and Support Us.
          </p>
        )}
      </div>

      <div className='mt-8 flex flex-wrap gap-4 text-sm'>
        <Link href='/admin' className='text-[#005CFF] underline'>
          Admin home
        </Link>
        <Link href='/support-us' className='text-[#005CFF] underline'>
          Support Us
        </Link>
        <Link href='/' className='text-[#005CFF] underline'>
          Homepage
        </Link>
      </div>

      <ol className='mt-10 list-decimal space-y-2 pl-5 text-sm text-[#444]'>
        <li>Export or save your report as a PDF.</li>
        <li>
          Copy it to <code className='rounded bg-[#eee] px-1 text-xs'>allyours-ngo/public/{DONATION_REPORT_FS_PATH}</code>{' '}
          (exact name).
        </li>
        <li>Commit and push, or redeploy your host so production serves the new file.</li>
      </ol>
    </div>
  )
}
