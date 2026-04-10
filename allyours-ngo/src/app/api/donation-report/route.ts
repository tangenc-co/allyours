import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { DONATION_REPORT_FS_PATH, DONATION_REPORT_PUBLIC_PATH } from '@/lib/donation-report-static'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', DONATION_REPORT_FS_PATH)
    const exists = fs.existsSync(filePath)
    const url = exists ? DONATION_REPORT_PUBLIC_PATH : null
    return NextResponse.json(
      { url },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
    )
  } catch (e) {
    console.error('[GET donation-report]', e)
    return NextResponse.json({ url: null, error: 'read_failed' }, { status: 500 })
  }
}
