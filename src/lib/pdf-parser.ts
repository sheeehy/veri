import PDFParser from 'pdf2json'

export async function parsePdf(buffer: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()

    pdfParser.on('pdfParser_dataError', (errData: any) => reject(errData.parserError))
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      const text = pdfData.Pages.map((page: any) =>
        page.Texts.map((text: any) => decodeURIComponent(text.R[0].T)).join(' ')
      ).join('\n')
      resolve(text)
    })

    pdfParser.parseBuffer(Buffer.from(buffer))
  })
}

