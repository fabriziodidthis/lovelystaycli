import { githubUserFound, IGithubUser } from 'constants/types.js'
import validateUser from '../validators/usernameValidator.js'

const fetchUserDataFromGithub = async (
  username: string,
): Promise<IGithubUser | null> => {
  try {
    validateUser(username)

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
    // return fetchUserData.json() as Promise<IGithubUser>
    const fetchUserDataToJSON: githubUserFound =
      (await fetchUserData.json()) as githubUserFound
    return fetchUserDataToJSON
  } catch (error) {
    // handle the error here
    return null
  }
}
export { fetchUserDataFromGithub }
