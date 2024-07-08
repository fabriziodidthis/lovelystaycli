import { userLanguages, userRepositories } from '../constants/types.js'

/**
 *  Fetches the repositories of a user from GitHub
 * @param {string} username - The username to fetch the repositories from the GitHub API
 * @type {string}
 * @returns {Promise<Array<string>>} - The repositories of the user
 */
async function fetchRepositories(username: string) {
  const repoUrl = `https://api.github.com/users/${username}/repos`
  const response = await fetch(repoUrl)
  const userRepositories: userRepositories =
    (await response.json()) as userRepositories
  return userRepositories.map(repo => repo.name)
}

/**
 * Fetch the user repositories languages from GitHub API and calculate the percentage of each language
 * in all user's repositories
 * @param {string} username - The username to fetch the programming languages from
 * @returns {Promise<userLanguages | undefined>} - An object with the programming languages and their percentage
 */
async function percentageByLanguages(
  username: string,
): Promise<userLanguages | undefined> {
  try {
    const repositories = await fetchRepositories(username)
    const languageData: { [key: string]: number } = {}

    for (const repository of repositories) {
      const url = `https://api.github.com/repos/${username}/${repository}/languages`
      const response = await fetch(url)
      const repoLanguages = await response.json()

      for (const [language, bytes] of Object.entries(
        repoLanguages as { [s: string]: number },
      )) {
        const languageLower = language.toLowerCase()

        if (!languageData[languageLower]) {
          languageData[languageLower] = 0
        }
        languageData[languageLower] += bytes
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
    languagePercentages.sort(
      (
        a: { language: string; percentage: string },
        b: { language: string; percentage: string },
      ) => parseFloat(b.percentage) - parseFloat(a.percentage),
    )

    const formattedOutput: { [key: string]: number } =
      languagePercentages.reduce((acc, { language, percentage }) => {
        // @ts-expect-error - language is a string
        acc[language] = `${percentage}`
        return acc
      }, {})

    return formattedOutput
  } catch (error) {
    console.error('Error fetching language data or saving to database:', error)
  }
}

export { percentageByLanguages }
