import { githubUserFound } from 'constants/types.js'
import { db } from '../database/config/pgpromise.js'
import pg from 'pg-promise'
const { ParameterizedQuery } = pg

/**
 * @description List all users in the database based on the language they
 * have used in their repositories.
 * @param {string} - The language to list users from
 * @returns {string} - The data of all users in the database based on the language
 */

async function listUsersByLanguage(language: string): Promise<void> {
  try {
    const query = new ParameterizedQuery({
      text: `
        SELECT *
        FROM github_users, unnest(user_languages) AS lang
        WHERE lang::jsonb ? $1
      `,
      values: [language],
    })
    const users = await db.any(query, [language])

    if (users.length === 0) {
      console.log(
        'No users found for the specified language. Please check the language string and database content.',
      )
    } else {
      const formattedUsers: githubUserFound[] = users.map(user => ({
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
      console.log(`Found ${users.length} users with language: '${language}'`)
      console.table(formattedUsers, [
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
