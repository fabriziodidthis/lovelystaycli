import {
  githubUserFound,
  IGithubUser,
  userLanguages,
} from '../constants/types.js'
import validateUser from '../validators/usernameValidator.js'
import { db } from '../database/config/pgpromise.js'
import { fetchUserDataFromGithub } from '../helpers/fetchUserDataFromGithub.js'
import { percentageByLanguages } from './percentageByLanguages.js'

// Fetch user data from GitHub API
const fetchAndSaveUserData = async (
  username: string,
): Promise<IGithubUser | null> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching user data for - \x1b[31m${username}\x1b[0m -

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)

  validateUser(username)

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

    // Save the user data to the database
    try {
      await db.none(
        'INSERT INTO github_users(login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin, name, company, blog, location, email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at, user_languages) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, ARRAY[$33])',
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
          userLanguages,
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
  return null
}

export { fetchAndSaveUserData }
