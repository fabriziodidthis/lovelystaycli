import { retrieveUserDataFromDatabase } from '../helpers/retrieveUserDataFromDatabase.js'
import fs from 'node:fs'

import PDFPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces.js'
import { githubUserFound, userLanguages } from '../constants/types.js'

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

  function formatLanguagePercentages(input: string): string {
    const languagesArray: userLanguages = JSON.parse(input)
    const languages = languagesArray[0]

    if (Object.keys(languages).length === 0) {
      console.info(`User ${user.login} has no repositories to analyze`)
      process.exit(0)
    }

    let output = ''
    for (const [key, value] of Object.entries(languages)) {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1)
      output += `${formattedKey}: ${value}%\n`
    }

    return output.trim()
  }

  try {
    const fetchUserAvatar = await fetch(`https://github.com/${user.login}.png`)
    const arrayBuffer = await fetchUserAvatar.arrayBuffer()
    const userAvatar = Buffer.from(arrayBuffer)

    /**
     * The following code is in case you want to save a local image from the user avatar
     * It will be saved in the '/pdfs' folder (this can be changed anytime)
     */
    /*
    try {
      const userAvatarURL = `https://github.com/${userData.login}.png`
      const fileName = `./pdfs/${userData.login}.png`
      const fileWriterStream = createWriteStream(fileName)
      got
        .stream(userAvatarURL)
        .pipe(fileWriterStream)
        .on('finish', () => {
          console.log('Image downloaded successfully')
        })
        .on('error', error => {
          console.error(`Something went wrong: ${error.message}`)
        })
    } catch (error) {
      console.error('Error downloading image', error)
    }
    */

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      pageSize: 'A4',

      info: {
        title: `Github User - ${user.login}`,
        subject: `PDF created to display the Github user ${user.login} info`,
        keywords:
          'Github, User, PDF, LovelyStayCLI, Fabrizio Andre, fabriziodidthis',
        creator: 'Fabrizio Andre @fabriziodidthis',
        author: 'Fabrizio Andre @fabriziodidthis',
        producer: 'Fabrizio Andre @fabriziodidthis',
      },

      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: true,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true,
      },

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

        columns: [
          {
            image: './dist/utils/images/lovelystay-logo.png',
            width: 200,
            margin: [15, 0, 0, 0],
            alignment: 'left',
          },
          {
            text: [
              {
                text: 'LovelyStayCLI by: ',
                style: {
                  fontSize: 20,

                  alignment: 'center',
                },
              },
              {
                text: '@fabriziodidthis',
                link: 'https://github.com/fabriziodidthis',
                style: {
                  fontSize: 20,
                  alignment: 'right',
                  bold: true,
                },
              },
            ],
          },
        ],
      },
      watermark: {
        text: 'LovelyStayCLI by @fabriziodidthis',
        color: 'blue',
        opacity: 0.1,
        bold: true,
        italics: false,
      },
      content: [
        '\n\n\n\n\n\n',
        {
          margin: [-30, 0, 0, 0],
          table: {
            widths: ['30%', '22%', '48%'],

            body: [
              [
                {
                  text: 'About User',
                  style: 'tableHeader',
                  alignment: 'center',
                },
                { text: 'Key', style: 'tableHeader', alignment: 'center' },
                { text: 'Value', style: 'tableHeader', alignment: 'center' },
              ],
              [
                {
                  // If any more rows are added, this 'rowSpan' will need to be adjusted
                  // accordingly to the number of rows added
                  rowSpan: 8,
                  colSpan: 1,
                  border: [false, false, false, false],
                  fillColor: '#eeeeee',
                  stack: [
                    {
                      image: userAvatar,
                      width: 160,
                    },
                    {
                      text: `${user.name}`,
                      style: 'subheader',
                    },
                    {
                      text: `Bio: ${user.bio}`,
                      style: 'bio',
                    },
                  ],
                },
                'Login: ',
                `${user.login}`,
              ],
              ['', 'User URL', `${user.html_url}`],
              ['', 'Location', `${user.location}`],
              ['', 'Email: ', `${user.email}`],
              ['', 'Hirable', `${user.hireable}`],
              ['', 'Twitter', `${user.twitter_username}`],
              ['', 'Public Repositories', `${user.public_repos}`],
              [
                '',
                'User Languages',
                formatLanguagePercentages(
                  JSON.stringify(user.user_languages || {}),
                ),
              ],
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        subheader: {
          fontSize: 18,
          alignment: 'left',
          bold: true,
          marginTop: 15,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        bio: {
          fontSize: 14,
          alignment: 'left',
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
