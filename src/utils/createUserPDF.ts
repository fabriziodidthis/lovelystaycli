import { retrieveUserDataFromDatabase } from '../helpers/retrieveUserDataFromDatabase.js'
import fs from 'node:fs'
import got from 'got'

import PDFPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces.js'
import { githubUserFound } from 'constants/types.js'

const createUserPDF = async (username: string) => {
  const user: githubUserFound = (await retrieveUserDataFromDatabase(
    username,
  )) as unknown as githubUserFound

  const date = new Date().toISOString().replaceAll(':', '-')
  const pdfPath = `./pdfs/${user.login}-${date}.pdf`
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  }

  try {
    const userAvatar = await got(
      `https://github.com/${user.login}.png`,
    ).buffer()

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + ' of ' + pageCount
      },
      header: {
        margin: 10,
        columns: [
          {
            image: './dist/utils/images/lovelystay-logo.png',
            width: 200,
          },
          {
            margin: [10, 0, 0, 0],
            text: '',
          },
          { text: 'LovelyStay', style: 'header' },
        ],
      },
      content: [
        { columns: [] },
        { text: user.name, style: 'header' },
        {
          style: 'table',
          color: '#444',
          table: {
            widths: [200, 'auto', 'auto'],
            // widths: [200, 'auto', 'auto'],
            headerRows: 2,
            body: [
              [
                {
                  columns: [
                    {
                      image: userAvatar,
                      fit: [100, 100],
                      alignment: 'left',
                    },
                  ],
                  rowSpan: 8,

                  text: `Username: ${user.login}`,

                  fillColor: '#eeeeee',
                  border: [false, false, false, false],
                },
                'Key',
                'Value',
              ],
              ['', 'Username', `${user.login}`],
              ['', 'Bio', `${user.bio}`],
              ['', 'Location', `${user.location}`],
              ['', 'Hireable', `${user.hireable}`],
              ['', 'Twitter', `${user.twitter_username}`],
              ['', 'Blog', `${user.blog}`],
              ['', 'Public Repos', `${user.public_repos}`],
            ],
          },
        },
      ],

      styles: {
        header: {
          fontSize: 25,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'left',
        },
        table: {
          margin: [0, 0, 0, 0],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    }
    const printer = new PDFPrinter(fonts)
    const pdfDoc = printer.createPdfKitDocument(docDefinitions)
    pdfDoc.pipe(fs.createWriteStream(pdfPath))

    pdfDoc.end()
    console.log(`PDF for the user - ${user.login} - was created at ${pdfPath}`)
  } catch (error) {
    console.error('Error creating PDF', error)
  }
}

export { createUserPDF }
