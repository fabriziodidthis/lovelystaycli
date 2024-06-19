import { githubUserFound, IGithubUser } from '../constants/types.js'
import validateUser from '../validators/usernameValidator.js'

import terminalImage from 'terminal-image'
import got from 'got'
import { fetchUserDataFromGithub } from '../helpers/fetchUser.js'
/**
 * @description Show user information
 * @param userData
 * @returns A table with the user information
 */

const showUserData = async (username: string): Promise<IGithubUser> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching user data for - \x1b[31m${username}\x1b[0m -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  validateUser(username)

  try {
    const userData = (await fetchUserDataFromGithub(
      username,
    )) as githubUserFound
    const userIMG = await got(userData.avatar_url).buffer()
    console.log(
      await terminalImage.buffer(userIMG, {
        width: '30%',
        height: '30%',
        preserveAspectRatio: true,
      }),
    )
    console.table(userData)
    return null
  } catch (error) {
    console.error(
      'Something went wrong while fetching the user, try again later.',
      error,
    )
  }
  return null
}

export { showUserData }
