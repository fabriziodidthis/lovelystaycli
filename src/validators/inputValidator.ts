import { escape } from 'html-escaper'

/**
 * @description Validates the input data to sanitize the data
 * @description and prevent SQL injection. The regex provided allows only
 * - letters, numbers, spaces and letters with accent like ã, é, ç and more.
 * @param input
 * @returns A boolean value
 */

const validateInput = (input: string) => {
  const userInput = escape(input)
  const inputRegex = /^[A-Za-zÀ-ÿ0-9\s]*$/

  if (input === undefined || input === null || input === '') {
    console.log('The input must be a string.')
  }

  if (!inputRegex.test(userInput)) {
    console.log(
      'The string provided contains invalid characters. Please inform only letters and/or numbers.',
    )
  }

  return userInput
}

export { validateInput }
