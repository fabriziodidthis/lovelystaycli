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
      // OK
      footer: {
        margin: [10, 0, 25, 0],
        columns: [
          { text: `Generated at ${date}`, alignment: 'left' },
          {
            text: 'LovelyStayCLI at Github',
            link: 'https://github.com/fabriziodidthis/lovelystaycli',
            color: 'blue',
            alignment: 'right',
          },
        ],
      },

      header: {
        margin: 10,
        lineHeight: 1,

        columns: [
          {
            image: './dist/utils/images/lovelystay-logo.png',
            width: 200,
            alignment: 'left',
          },
          { text: 'LovelyStay', style: 'header', alignment: 'right' },
        ],
      },
      content: [
        '\n\n\n\n\n',
        {
          table: {
            widths: ['auto', 'auto', 'auto'],
            headerRows: 2,
            body: [
              [
                {
                  rowSpan: 3,
                  stack: [
                    {
                      image: userAvatar,
                      width: 100,
                      height: 100,
                    },
                    { text: `${user.name}`, style: 'subheader' },
                    { text: `Bio: ${user.bio}`, style: '' },
                  ],
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
        {
          style: 'zebra',
          table: {
            body: [
              [
                {
                  rowSpan: 3,
                  stack: [],

                  text: 'rowSpan: 3\n\nborder:\n[false, false, false, false]',
                  fillColor: '#eeeeee',
                  border: [false, false, false, false],
                },
                'border:\nundefined',
                'border:\nundefined',
              ],
              ['', 'border:\nundefined', 'border:\nundefined'],
              ['', 'border:\nundefined', 'border:\nundefined'],
            ],
          },
        },
      ],

      styles: {
        header: {
          fontSize: 25,
          bold: true,
          // alignment: 'center',
          margin: [20, 0, 25, 0],
        },
        subheader: {
          fontSize: 14,
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
