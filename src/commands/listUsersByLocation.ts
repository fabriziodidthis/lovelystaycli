import { validateInput } from '../validators/inputValidator.js'
import { db } from '../database/config/pgpromise.js'
import { githubUserFound } from '../constants/types.js'

/**
 *  List users by location provided by the current application user
 * @param {string} location - The location (City / Country ) provided by the GitHub user in their profile
 * @type {string}
 * @returns A table with the users by location
 */

async function listUsersByLocation(
  location: string,
): Promise<Array<githubUserFound>> {
  validateInput(location).trim()

  const users = await db.manyOrNone(
    'SELECT * FROM github_users WHERE location = $1',
    [location],
  )

  if (users.length === 0) {
    console.log('No users found from the entered location')
    return []
  }

  console.log(`Found ${users.length} user(s) from ${location}`)

  console.table(users, [
    'name',
    'login',
    'html_url',
    'public_repos',
    'hireable',
  ])
  return []
}

export { listUsersByLocation }
