#!/usr/bin/env -S ts-node --files
// The script above is called 'shebang' and it is used
// to run the script directly from the terminal
// https://github.com/TypeStrong/ts-node?tab=readme-ov-file#shebang

// Import necessary libraries
import { program } from '@commander-js/extra-typings'
import welcomeMessage from './constants/welcomeMessage.js'
import { programOptions } from './constants/types.js'
import { fetchAndSaveUserData } from './commands/fetchAndSaveUserData.js'
import { showUserDataFromGithub } from './commands/showUserDataFromGithub.js'
import { listAllUsers } from './commands/listAllUsers.js'
import { listUsersByLocation } from './commands/listUsersByLocation.js'
import { assert } from 'node:console'
import { listUsersByLanguage } from './commands/listUsersByLanguage.js'
import { showUserDataFromDatabase } from './commands/showUserDataFromDatabase.js'
import { createUserPDF } from './utils/createUserPDF.js'

// Import package.json to get version
// IF, for any reason, there is a need to import package.json, it can be done as follows:
// const packageJson = await import('./../package.json', { assert: { type: 'json' } });
// program
// .version(`${packageJson.default.version}`)
// ...
//  Also, need to add '"resolveJsonModule": true,' in tsconfig.json file

console.clear()
console.log(welcomeMessage)

/**
 *  Setup commander for CLI commands
 */
program
  .version(`${process.env.npm_package_version}`)
  .description('CLI for managing GitHub users data')
  .name('lovely')
  .description(
    'LovelyStay CLI is a tool to manage your properties and bookings',
  )
  .usage('[options]')
  .option('-f, --fetch [username...]', 'Fetch and save user information')
  .option(
    '-s, --show [user]',
    'Show user information from Github API (not from the saved information in the database)',
  )
  .option('-r, --repo [username]', 'Retrieve users repositories')
  .option(
    '-w, --whois [username]',
    'Retrieve users information from the database',
  )
  .option('-l, --list', 'List all users in the database')
  .option(
    '-g, --geo',
    'Retrieve users from location (when informed in the Github user profile)',
  )
  .option(
    '-la, --lang',
    'Retrieve users from programming language (when informed)',
  )
  .option('-pdf, --pdf', 'Create a PDF with user information')
  .combineFlagAndOptionalValue(false)
  .parse(process.argv)

program.on('--help', () => {
  console.log('')
  console.log('')
  console.log('Examples:')
  console.log('')
  console.log('  $ lovely -f fabriziodidthis')
  console.log('  $ lovely -l fabriziodidthis')
  console.log('  $ lovely -w fabriziodidthis')
  console.log('  $ lovely -s fabriziodidthis')
  console.log('  $ lovely -g "Lisbon, Portugal"')
  console.log('  $ lovely -la "JavaScript"')
  console.log('  $ lovely -r fabriziodidthis')
  console.log('  $ lovely -pdf fabriziodidthis')
})

const options: programOptions = program.opts()

if (!process.argv.slice(2).length) {
  program.help()
}

/**
 *  When the fetch option is passed, the CLI should fetch the user data
 * from the GitHub API and display it in the console.
 *
 * The fetch option should accept a username as an argument.
 * @param {string} - The username to fetch data from
 * @returns {string} - The fetched data
 */
if (options.fetch) {
  assert(process.argv[3], 'Please provide a valid username to fetch user data.')
  if (!process.argv[3]) {
    console.log('Please provide a valid username to fetch user data.')
    process.exit(0)
  }
  void fetchAndSaveUserData(`${process.argv[3]}`)
}

/**
 *  When the show option is passed, the CLI should show the user data
 * from the GitHub API and display it in the console.
 * The show option should accept a username as an argument.
 * @param {string} - The username to show data from
 * @returns {string} - The data of the user
 */
if (options.show) {
  assert(process.argv[3], 'Please provide a valid username to fetch user data.')
  if (!process.argv[3]) {
    console.log('Please provide a valid username to fetch user data.')
    process.exit(0)
  }
  void showUserDataFromGithub(`${process.argv[3]}`)
}

/**
 *  When the list option is passed, the CLI should list the users
 * in the database. This option has no argument.
 * @returns {string} - The data of all users in the database
 */
if (options.list) {
  void listAllUsers()
}

/**
 *  List all users by location
 * @param {string} - The location to list users from
 * @returns {string} - The data of all users in the database based on their location
 */
if (options.geo) {
  assert(process.argv[3], 'Please provide a valid location to search.')
  void listUsersByLocation(`${process.argv[3]}`)
}

/**
 *  List all users by programming language
 * @param {string} - The programming language to list users from
 * @returns {string} - The data of all users in the database based on the programming language searched
 */
if (options.lang) {
  assert(
    process.argv[3],
    'Please provide a valid programming language to search.',
  )
  void listUsersByLanguage(`${process.argv[3]}`)
}

/**
 *  Show user data from the database
 * @param {string} - The username to show data from
 * @returns {string} - The data of the user
 */
if (options.whois) {
  assert(
    process.argv[3],
    'Please provide a valid username to fetch user data from the database.',
  )
  void showUserDataFromDatabase(`${process.argv[3]}`)
}

/**
 *  Create a PDF with user information
 * @param {string} - The username to create a PDF from
 * @returns {string} - The PDF file with the user information
 */
if (options.pdf) {
  assert(process.argv[3], 'Please provide a valid username to fetch user data.')

  void createUserPDF(`${process.argv[3]}`)
}
