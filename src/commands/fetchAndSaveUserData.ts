import { IGithubUser } from '../constants/types.js'
import validateUser from '../helpers/usernameValidator.js'
import { db } from '../database/config/pgpromise.js'

// Fetch user data from GitHub API
const fetchAndSaveUserData = async (username: string): Promise<IGithubUser> => {
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
    const { login, id, node_id } = fetchUserDataToJSON as any

    const userExist = await db.oneOrNone(
      'SELECT * FROM github_users WHERE login = $1',
      [login],
    )
    if (userExist) {
      console.log(
        `User ${JSON.stringify(login)} already exists in the database.`,
      )
      return null
    }
    try {
      await db.none(
        'INSERT INTO github_users(login, id, node_id) VALUES($1, $2, $3)',
        [login, id, node_id],
      )
      console.log(`User ${JSON.stringify(login)} saved successfully`)
    } catch (error) {
      console.error('Error saving user', error)
    }
    console.table(fetchUserDataToJSON)
  } catch (error) {
    console.error(
      'Something went wrong while fetching the user, try again later.',
      error,
    )
  }
  return null
}

export { fetchAndSaveUserData }
