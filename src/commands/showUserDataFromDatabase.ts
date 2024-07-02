import { githubUserFound, IGithubUser } from '../constants/types.js'
import { retrieveUserDataFromDatabase } from '../helpers/retrieveUserDataFromDatabase.js'
import { showUserImage } from '../helpers/showUserImage.js'

/**
 *  Show user information saved in the database
 * @param {string} username - The username to fetch the user information from along the user image, if available
 * @type {string}
 * @returns A table with the user information
 */
const showUserDataFromDatabase = async (
  username: string,
): Promise<IGithubUser | null> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Retrieving user data from database for - \x1b[31m${username}\x1b[0m -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  try {
    const userData = (await retrieveUserDataFromDatabase(
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

export { showUserDataFromDatabase }
