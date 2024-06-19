import { db } from '../database/config/pgpromise.js'
import { githubUserFound } from 'constants/types.js'

/**
 * @description List users by location
 * @param location
 * @returns A table with the users by location
 */

async function listUsersByLocation(
  location: string,
): Promise<Array<githubUserFound>> {
  const users = await db.manyOrNone(
    'SELECT * FROM github_users WHERE location = $1',
    [location],
  )
  /*

  const users = await db.manyOrNone(
    'SELECT * FROM github_users WHERE location = $1',
    [location],
  )
  console.table(users)
  */
  if (users.length === 0) {
    console.log('No users found from the entered location')
    return []
  }

  console.table(users, [
    'name',
    'login',
    'html_url',
    'public_repos',
    'hireable',
  ])
  return users
}

export { listUsersByLocation }
