import terminalImage from 'terminal-image'
import got from 'got'
import { githubUserFound } from '../constants/types.js'

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
