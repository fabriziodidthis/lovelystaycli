import terminalImage from 'terminal-image'
import got from 'got'
import { githubUserFound } from '../constants/types.js'

/**
 *  Show user image in the terminal
 * @param {string} username - The username to fetch the user image from the database
 * @type {Promise<void>}
 * @returns The user image in the terminal (in a very bad resolution =D)
 */
const showUserImage = async (username: githubUserFound) => {
  const userIMG = await got(username.avatar_url).buffer()
  console.log(
    await terminalImage.buffer(userIMG, {
      width: '30%',
      height: '30%',
      preserveAspectRatio: true,
    }),
  )
}

export { showUserImage }
