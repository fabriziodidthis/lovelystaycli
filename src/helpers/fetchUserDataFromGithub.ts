import validateUser from '../validators/usernameValidator.js'
import { githubUserFound, IGithubUser } from '../constants/types.js'

/**
 * Fetch user data from Github API
 * @param {string} username - The username to fetch the user information from the Github API
 * @returns A table with the user information, this function DOES NOT save ANY information in the database. It is only used to fetch the user data from the Github API and display it in the console.
 */
const fetchUserDataFromGithub = async (
  username: string,
): Promise<IGithubUser | null> => {
  try {
    validateUser(username)
    const fetchUserData = await fetch(
      `https://api.github.com/users/${username}`,
    )
    if (!fetchUserData.ok) {
      console.error('Failed to fetch user data')
    }
    if (fetchUserData.status === 403) {
      console.log('You have exceeded the rate limit for GitHub API.')
      process.exit(0)
    }
    if (fetchUserData.status === 404) {
      console.log(`The username - ${username} - could not be found.`)
      process.exit(0)
    }
    const fetchUserDataToJSON: githubUserFound =
      (await fetchUserData.json()) as githubUserFound
    return fetchUserDataToJSON
  } catch (error) {
    console.error(
      'Something went wrong while fetching the user, try again later.',
      error,
    )
  }
  return null
}
export { fetchUserDataFromGithub }
