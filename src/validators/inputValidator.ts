/**
 * Validates the input data to sanitize the data
 * and prevent SQL injection. The regex provided allows only
 * - letters, numbers, spaces and letters with accent like ã, é, ç and more.
 * @param input
 * @returns A boolean value
 */

const validateInput = (input: string) => {
  const inputRegex = /^[A-Za-zÀ-ÿ0-9\s]*$/
  const cleanInput = input.replace(/[^A-Za-zÀ-ÿ0-9\s]/g, '')

  if (cleanInput === undefined || cleanInput === null || cleanInput === '') {
    console.log('The input must be a string.')
    process.exit(0)
  }

  if (!inputRegex.test(cleanInput)) {
    console.error(
      'The string provided contains invalid characters. Please inform only letters and/or numbers.',
    )
    process.exit(0)
  }

  return cleanInput
}

export { validateInput }
