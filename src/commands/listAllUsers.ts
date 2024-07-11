import { formatUserLanguages } from '../helpers/formatUserLanguagesForTable.js'
import { githubUserFound } from '../constants/types.js'
import { db } from '../database/config/pgpromise.js'

/**
 *  List all users in the database
 * @returns - A table with all users in the database with selected columns to fit better in the console
 */
const listAllUsers = async (): Promise<void> => {
  try {
    const users = (await db.any(
      'SELECT * FROM github_users, unnest(user_languages) ',
    )) as unknown as githubUserFound[]

    const format = formatUserLanguages(users)

    if (users.length === 0) {
      console.error('No users found.')
    } else {
      console.log(`
      -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

            Fetching users data from database

      -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
      `)

      console.table(format, [
        'name',
        'login',
        'html_url',
        'public_repos',
        'hireable',
        'user_languages',
      ])
    }
  } catch (error) {
    console.error('An error occurred while fetching users data.', error)
  }
}

export { listAllUsers }
