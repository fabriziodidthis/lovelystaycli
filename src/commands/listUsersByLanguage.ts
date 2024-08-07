import { githubUserFound } from 'constants/types.js'
import { db } from '../database/config/pgpromise.js'
import pg from 'pg-promise'
import { validateInput } from '../validators/inputValidator.js'
import { formatUserLanguages } from '../helpers/formatUserLanguagesForTable.js'
const { ParameterizedQuery } = pg

/**
 *  List all users in the database based on the language provided by the current user and that is listed in any users's repositories
 * @param {string} language - The language to list users from
 * @type {string}
 * @returns {string} - The data of all users in the database based on the language
 */

async function listUsersByLanguage(language: string): Promise<void> {
  try {
    validateInput(language)
    const query = new ParameterizedQuery({
      text: `
        SELECT *
        FROM github_users, unnest(user_languages) AS lang
        WHERE lang::jsonb ? $1
      `,
      values: [language],
    })
    const users = (await db.any(query, [language])) satisfies githubUserFound[]

    if (users.length === 0) {
      console.log(
        'No users found for the specified language. Please check the language string and database content.',
      )
    } else {
      const format = formatUserLanguages(users)
      console.log(`Found ${users.length} users with language: '${language}'`)
      console.table(format, [
        'name',
        'login',
        'location',
        'html_url',
        'user_languages',
      ])
    }
  } catch (error) {
    console.error('Error executing query:', error)
  }
}

export { listUsersByLanguage }
