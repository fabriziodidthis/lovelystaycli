import { githubUserFound } from '../constants/types.js'

/**
 * Since console.table doesn't support nested objects, we need to format the user_languages object to a string
 * This function will recursively format nested objects to a string
 * @param obj - The object to format
 * @returns - The formatted string
 */
const formatUserLanguages = (users: githubUserFound[]) => {
  return users.map(user => {
    // To console the languages for each user breaks the table format (console.table does not support break lines inside of it).
    // https://console.spec.whatwg.org/#table
    // So, if you want to see the languages for each user outside the table, comment the line
    // 'user_languages' in the `console.table` function in the end of this file and uncomment the console.log below.
    // console.log(
    //   `Showing languages for user ${user.login}:`,
    //   user.user_languages,
    // )
    try {
      const userLanguages: Record<string, number> = user.user_languages || {}
      // Check if userLanguages is already an object or if it's a string that needs parsing
      let languages
      if (
        typeof userLanguages === 'string' &&
        (userLanguages as string).trim().startsWith('{') &&
        (userLanguages as string).trim().endsWith('}')
      ) {
        languages = JSON.parse(userLanguages) satisfies Record<string, number>
      } else if (typeof userLanguages === 'string') {
        // Handle case where userLanguages is a string but not in JSON format
        throw new Error(`Invalid JSON format: ${userLanguages}`)
      } else {
        // Assuming userLanguages is already in the correct format (e.g., an object)
        languages = userLanguages
      }

      const formatObjectToString = (obj: Record<string, number>): string => {
        return Object.entries(obj)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              // Convert array values to string without indices
              return `${key}: [${value
                .map((val: unknown) =>
                  typeof val === 'object' &&
                  val !== null &&
                  !Array.isArray(val) &&
                  Object.keys(val).length > 0
                    ? `{ ${formatObjectToString(val as Record<string, number>)} }`
                    : val?.toString(),
                )
                .join(', ')}]`
            } else if (typeof value === 'object' && value !== null) {
              // Recursively format nested objects
              return `${key}: ${formatObjectToString(value)}`
            } else {
              // Directly return the key-value pair
              return `${key}: ${value}%`
            }
          })
          .join(`, `)
      }
      let formattedLanguages = 'No languages found'
      if (languages && Object.keys(languages).length > 0) {
        formattedLanguages = formatObjectToString(languages)
      }
      return {
        ...user,
        user_languages: formattedLanguages,
      }
    } catch (error) {
      console.error(`Error parsing languages for user ${user.login}:`, error)
      return {
        ...user,
        user_languages: 'Error parsing languages',
      }
    }
  })
}

export { formatUserLanguages }
