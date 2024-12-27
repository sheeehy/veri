import { NextRequest, NextResponse } from 'next/server'
import { parsePdf } from '@/lib/pdf-parser'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const buffer = await file.arrayBuffer()
    const text = await parsePdf(buffer)
    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error parsing PDF:', error)
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 })
  }
}

