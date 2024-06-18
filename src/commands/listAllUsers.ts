import { db } from '../database/config/pgpromise.js'
import { table } from 'table'

/**
 * @description List all users in the database
 * @returns A table with all users in the database
 */
const listAllUsers = async (): Promise<void> => {
  console.log(`
  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

        Fetching users data from database

  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  `)
  const users = await db.any('SELECT * FROM github_users')

  // Check if users array is not empty
  if (users.length > 0) {
    // Extract column names (headers) from the first user object
    const headers = Object.keys(users[0])

    // Transform users array of objects into an array of arrays
    const data = users.map(user => Object.values(user))

    // Prepend headers to the data array
    const tableData = [headers, ...data]

    // Use the table package to format the data
    console.log(table(tableData))
  } else {
    console.log('No users found.')
  }
}

export { listAllUsers }
