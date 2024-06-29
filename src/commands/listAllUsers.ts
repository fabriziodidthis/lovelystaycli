import { db } from '../database/config/pgpromise.js'

/**
 * @description List all users in the database
 * @param takes no arguments
 * @returns A table with all users in the database with
 * selected columns to fit better in the console
 */
const listAllUsers = async (): Promise<void> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching users data from database

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  try {
    const users = await db.any('SELECT * FROM github_users')

    const formattedUsers = users.map(user => ({
      ...user,
      user_languages: user.user_languages
        .map((lang: string) => {
          const parsedLang = JSON.parse(lang)
          return Object.entries(parsedLang)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
        })
        .join('\n'),
    }))

    if (users.length > 0) {
      console.table(formattedUsers, [
        'name',
        'login',
        'html_url',
        'public_repos',
        'hireable',
        'user_languages',
      ])
    } else {
      console.error('No users found.')
    }
  } catch (error) {
    console.error('An error occurred while fetching users data.', error)
  }
}

export { listAllUsers }
