import { githubUserFound, IGithubUser } from '../constants/types.js'
import { fetchUserDataFromGithub } from '../helpers/fetchUserDataFromGithub.js'
import { showUserImage } from '../helpers/showUserImage.js'
/**
 * @description Fetch and show user information from the Github API
 * @param username string
 * @returns A table with the user information
 */

const showUserDataFromGithub = async (
  username: string,
): Promise<IGithubUser | null> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching user data from Github API for - \x1b[31m${username}\x1b[0m -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  try {
    const userData = (await fetchUserDataFromGithub(
      username,
    )) as githubUserFound

    await showUserImage(userData)
    console.table(userData)
  } catch (error) {
    console.error(
      'Something went wrong while fetching the user, try again later.',
      error,
    )
  }
  return null
}

export { showUserDataFromGithub }
