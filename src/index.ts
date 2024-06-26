#!/usr/bin/env -S ts-node --files
// The script above is called 'shebang' and it is used
// to run the script directly from the terminal
// https://github.com/TypeStrong/ts-node?tab=readme-ov-file#shebang

// Import necessary libraries
import { program } from '@commander-js/extra-typings'
import welcomeMessage from './constants/welcomeMessage.js'
import { programOptions } from './constants/types.js'
import { fetchAndSaveUserData } from './commands/fetchAndSaveUserData.js'
import { showUserData } from './commands/showUserData.js'
import { listAllUsers } from './commands/listAllUsers.js'
import { listUsersByLocation } from './commands/listUsersByLocation.js'
import { assert } from 'node:console'

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
 * @description Setup commander for CLI commands
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
  .combineFlagAndOptionalValue(false)
  .parse(process.argv)

program.on('--help', () => {
  console.log('')
  console.log('')
  console.log('Examples:')
  console.log('')
  console.log('  $ lovely -f fabriziodidthis')
  console.log('  $ lovely -l fabriziodidthis')
  console.log('  $ lovely -s fabriziodidthis')
  console.log('  $ lovely -g "Lisbon, Portugal"')
  console.log('  $ lovely -la "JavaScript"')
  console.log('  $ lovely -r fabriziodidthis')
})

const options: programOptions = program.opts()

if (!process.argv.slice(2).length) {
  program.help()
}

/**
 * @description When the fetch option is passed, the CLI should fetch the user data
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
 * @description When the show option is passed, the CLI should show the user data
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
  void showUserData(`${process.argv[3]}`)
}

/**
 * @description When the list option is passed, the CLI should list the users
 * in the database. This option has no argument.
 * @returns {string} - The data of all users in the database
 */
if (options.list) {
  void listAllUsers()
}

/**
 * @description List all users by location
 * @param {string} - The location to list users from
 * @returns {string} - The data of all users in the database based on their location
 */
if (options.geo) {
  assert(
    process.argv[3],
    'There is no user with this location. Please provide a valid location.',
  )
  void listUsersByLocation(`${process.argv[3]}`)
}
