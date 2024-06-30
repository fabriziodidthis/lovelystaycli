import { githubUserFound, IGithubUser } from '../constants/types.js'

/**
 * @description Fetch user data from Github API
 * @param username string
 * @returns A table with the user information
 */
const fetchUserDataFromGithub = async (
  username: string,
): Promise<IGithubUser | null> => {
  try {
    const fetchUserData = await fetch(
      `https://api.github.com/users/${username}`,
    )
    if (!fetchUserData.ok) {
      console.error('Failed to fetch user data')
    }
    if (fetchUserData.status === 403) {
      console.log('You have exceeded the rate limit for GitHub API.')
    }
    if (fetchUserData.status === 404) {
      console.log(`The username - ${username} - could not be found.`)
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
