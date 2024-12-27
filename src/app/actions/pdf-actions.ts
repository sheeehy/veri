'use server'

import { put } from '@vercel/blob'
import pdfParse from 'pdf-parse'

export async function uploadPdfAndExtractText(formData: FormData) {
  try {
    const file = formData.get('pdf') as File
    if (!file) {
      throw new Error('No file uploaded')
    }

    // Upload the file to Vercel Blob
    const blob = await put(file.name, file, { access: 'public' })

    // Fetch the PDF file from the Blob URL
    const response = await fetch(blob.url)
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from Blob: ${response.statusText}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    // Use pdf-parse to extract text from the PDF
    const data = await pdfParse(pdfBuffer)
    const text = data.text

    // Delete the temporary file from Vercel Blob
    // Note: You might want to implement a cleanup mechanism or keep files for a certain period
    // await del(blob.url)

    return { success: true, text }
  } catch (error) {
    console.error('Error processing PDF:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to process PDF' }
  }
}

