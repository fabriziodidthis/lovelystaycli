import { db } from '../database/config/pgpromise.js'
import { githubUserFound, IGithubUser } from '../constants/types.js'

/**
 * Fetch user data from Database
 * @param {string} login - The username to fetch the user information from the Database
 * @returns A table with the user information
 */
const retrieveUserDataFromDatabase = async (
  login: string,
): Promise<IGithubUser | null> => {
  try {
    const retrieveUserData: githubUserFound = (await db.oneOrNone(
      'SELECT * FROM github_users WHERE login = $1',
      [login] as string[],
    )) as githubUserFound

    if (!retrieveUserData) {
      console.error(
        `The username - ${login} - could not be found in the database.`,
      )
      process.exit(0)
    }

    return retrieveUserData
  } catch (error) {
    console.error(
      'Something went wrong while retrieving the user, try again later.',
      error,
    )
  }
  return null
}
export { retrieveUserDataFromDatabase }
