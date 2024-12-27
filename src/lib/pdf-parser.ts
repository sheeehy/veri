import PDFParser from 'pdf2json'

interface PdfParserError {
  parserError: Error
}

interface PdfChunk {
  T: string
}

interface PdfText {
  R: PdfChunk[]
}

interface PdfPage {
  Texts: PdfText[]
}

interface PdfData {
  Pages: PdfPage[]
}

export async function parsePdf(buffer: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()

    pdfParser.on('pdfParser_dataError', (errData: PdfParserError) => {
      reject(errData.parserError)
    })

    pdfParser.on('pdfParser_dataReady', (pdfData: PdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((txt) => decodeURIComponent(txt.R[0].T)).join(' ')
      ).join('\n')
      resolve(text)
    })

    pdfParser.parseBuffer(Buffer.from(buffer))
  })
}
