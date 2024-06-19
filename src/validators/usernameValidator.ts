const usernameValidator = new RegExp('^[a-zd](?:[a-zd]|-(?=[a-zd])){0,38}$')

const validateUser = (username: string) => {
  const isValid = usernameValidator.test(username)
  if (!isValid) {
    console.error('Invalid username. Please provide a valid username.')
    process.exit(0)
  }

  return isValid
}

export default validateUser
