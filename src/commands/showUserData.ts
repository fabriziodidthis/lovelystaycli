import { IGithubUser } from 'constants/types.js'
import { db } from '../database/config/pgpromise.js'
import validateUser from '../helpers/usernameValidator.js'

/**
 * @description Show user information
 * @param userData
 * @returns A table with the user information
 */

const showUserData = async (username: string): Promise<IGithubUser> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching user data for - ${username} -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  validateUser(username)

  try {
    const fetchUserData = await fetch(
      `https://api.github.com/users/${username}`,
    )
    if (!fetchUserData.ok) {
      throw new Error('Failed to fetch user data')
    }
    if (fetchUserData.status === 403) {
      console.log('You have exceeded the rate limit for GitHub API.')
    }
    if (fetchUserData.status === 404) {
      console.log(`The username - ${username} - could not be found.`)
    }

    const fetchUserDataToJSON = await fetchUserData.json()
    console.table(fetchUserDataToJSON)
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
