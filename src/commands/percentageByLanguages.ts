// @ts-nocheck
import { db } from './database/config/pgpromise.js'

async function fetchRepositories(username) {
  const repoUrl = `https://api.github.com/users/${username}/repos`
  const response = await fetch(repoUrl)
  const userRepositories = await response.json()
  return userRepositories.map(repo => repo.name)
}

async function fetchLanguagesForUser(username) {
  try {
    const repositories = await fetchRepositories(username)
    const languageData = {}

    for (const repository of repositories) {
      const url = `https://api.github.com/repos/${username}/${repository}/languages`
      const response = await fetch(url)
      const repoLanguages = await response.json()

      for (const [language, bytes] of Object.entries(repoLanguages)) {
        if (!languageData[language]) {
          languageData[language] = 0
        }
        languageData[language] += bytes
      }
    }

    const totalBytes = Object.values(languageData).reduce(
      (sum, bytes) => sum + bytes,
      0,
    )
    const languagePercentages = Object.entries(languageData).map(
      ([language, bytes]) => ({
        language,
        percentage: ((bytes / totalBytes) * 100).toFixed(2),
      }),
    )

    // Sort by percentage, descending
    languagePercentages.sort((a, b) => b.percentage - a.percentage)

    // Format the output
    const formattedOutput = languagePercentages
      .map(({ language, percentage }) => `${language}: ${percentage}%`)
      .join(', ')

    // Save the result to the database
    await db.any(
      // 'INSERT INTO github_users(user_languages) VALUES($1) WHERE login = $2',
      'UPDATE github_users SET user_languages = $1 WHERE login = $2',
      [formattedOutput, username],
    )

    console.log('Languages saved to database for user:', username)
  } catch (error) {
    console.error('Error fetching language data or saving to database:', error)
  }
}

export { fetchLanguagesForUser }
