import {
  githubUserFound,
  IGithubUser,
  userLanguages,
} from '../constants/types.js'
import validateUser from '../validators/usernameValidator.js'
import { db } from '../database/config/pgpromise.js'
import { fetchUserDataFromGithub } from '../helpers/fetchUserDataFromGithub.js'
import { percentageByLanguages } from './percentageByLanguages.js'
import { input } from '@inquirer/prompts'
import { updateUserInfo } from '../helpers/updateUserInfo.js'

/**
 * This function fetches the user data from the GitHub API
 * and saves it to the database, along with the languages in all the user's repositories
 * @param {string} username - The username to be fetched from the GitHub API
 * @returns {object} - The user data fetched from the GitHub API and a new insertion into the database
 */
const fetchAndSaveUserData = async (
  username: string,
): Promise<IGithubUser | null> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching user data for - \x1b[31m${username}\x1b[0m -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  validateUser(username)

  const existingUser: githubUserFound = (await db.oneOrNone(
    'SELECT * FROM github_users WHERE login = $1',
    [username] as string[],
  )) as githubUserFound

  if (existingUser === null) {
    try {
      const userData = await fetchUserDataFromGithub(username)
      const {
        login,
        id,
        node_id,
        avatar_url,
        gravatar_id,
        url,
        html_url,
        followers_url,
        following_url,
        gists_url,
        starred_url,
        subscriptions_url,
        organizations_url,
        repos_url,
        events_url,
        received_events_url,
        type,
        site_admin,
        name,
        company,
        blog,
        location,
        email,
        hireable,
        bio,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = userData as githubUserFound

      const locationToLowercase = location?.toLowerCase()
      const loginToLowercase = login.toLowerCase()

      // Check if user already exists in the database
      const userExist: IGithubUser | null = await db.oneOrNone(
        'SELECT * FROM github_users WHERE login = $1',
        [login] as string[],
      )
      if (userExist) {
        console.log(
          `User ${JSON.stringify(login)} already exists in the database.`,
        )
        console.log(userExist)
        return null
      }

      // User languages
      const userLanguages = (await percentageByLanguages(
        username,
      )) as unknown as userLanguages[]
      const userLanguagesArray = [userLanguages]

      const userInsertionDate = new Date().toISOString()

      // Save the user data to the database
      try {
        await db.none(
          'INSERT INTO github_users(login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin, name, company, blog, location, email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at, user_languages, saved_in) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33::jsonb[], $34)',
          [
            loginToLowercase,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            type,
            site_admin,
            name,
            company,
            blog,
            locationToLowercase,
            email,
            hireable,
            bio,
            twitter_username,
            public_repos,
            public_gists,
            followers,
            following,
            created_at,
            updated_at,
            userLanguagesArray,
            userInsertionDate,
          ],
        )
        console.log(`User ${JSON.stringify(login)} saved successfully`)
      } catch (error) {
        console.error('Error saving user', error)
      }
      console.table(userData)
    } catch (error) {
      console.error(
        'Something went wrong while fetching the user, try again later.',
        error,
      )
    }
  } else {
    const update = await input({
      message: `User ${username} already exists in the database. Do you want to update the user?`,
    })

    if (update) {
      console.log(`Updating user ${username}`)
      await updateUserInfo(username)
    }
  }
  return null
}

export { fetchAndSaveUserData }
