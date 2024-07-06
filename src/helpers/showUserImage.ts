import terminalImage from 'terminal-image'
import { githubUserFound } from '../constants/types.js'

/**
 * Show user image in the terminal
 * @param {string} username - The username to fetch the user image from the database
 * @type {Promise<void>}
 * @returns The user image in the terminal (in a very bad resolution =D)
 */
const showUserImage = async (username: githubUserFound) => {
  const fetchUserAvatar = await fetch(
    `https://github.com/${username.login}.png`,
  )
  const arrayBuffer = await fetchUserAvatar.arrayBuffer()
  const userAvatar = Buffer.from(arrayBuffer)
  console.log(
    await terminalImage.buffer(userAvatar, {
      width: '30%',
      height: '30%',
      preserveAspectRatio: true,
    }),
  )
}

export { showUserImage }
