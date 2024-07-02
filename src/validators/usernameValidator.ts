/**
 * This function validates the username provided by the user
 * according to the GitHub username rules as it follows below
 * {@link https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/iam-configuration-reference/username-considerations-for-external-authentication#about-username-normalization}
 * @param username - The username to be validated provided by the current application user
 * @returns a boolean value to indicate if the username is valid or not after regex verification
 */
const validateUser = (username: string) => {
  const usernameValidator = new RegExp('^[a-zd](?:[a-zd]|-(?=[a-zd])){0,38}$')
  const isValid = usernameValidator.test(username)
  if (!isValid) {
    console.error('Invalid username. Please provide a valid username.')
    process.exit(0)
  }

  return isValid
}

export default validateUser
