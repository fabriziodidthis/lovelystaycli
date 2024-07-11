import { percentageByLanguages } from '../commands/percentageByLanguages.js'
import {
  githubUserFound,
  IGithubUser,
  userLanguages,
} from '../constants/types.js'
import { db } from '../database/config/pgpromise.js'
import { fetchUserDataFromGithub } from './fetchUserDataFromGithub.js'

/**
 * Update user info in the database if the user is found
 * @param {githubUserFound} user - The user to update in the database
 * @type {Promise<void>}
 * @returns The user info updated in the database
 */
const updateUserInfo = async (username: string): Promise<void> => {
  try {
    // Delete the user row
    await db.none('DELETE FROM github_users WHERE login = $1', [username])
    console.log(`User ${username} has been deleted from the database.`)

    const newUserData: IGithubUser | null =
      await fetchUserDataFromGithub(username)

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
    } = newUserData as githubUserFound

    // User languages
    const userLanguages = (await percentageByLanguages(
      username,
    )) as unknown as userLanguages[]

    const userLanguagesArray = [userLanguages]
    const locationToLowercase = location?.toLowerCase()
    const loginToLowercase = login.toLowerCase()
    const userInsertionDate = new Date().toISOString()

    // Insert the new user data into the database
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

    const displayUserData = {
      ...newUserData,
      user_languages: userLanguagesArray,
    }
    console.log(`User ${username} has been saved in the database again.`)
    console.table(displayUserData)
  } catch (error) {
    console.error('Something went on updating user info', error)
  }
}

export { updateUserInfo }
