import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

// https://www.npmjs.com/package/class-validator#custom-validation-classes
@ValidatorConstraint({ name: 'isGithubUsernameValid', async: false })
export class isGithubUsernameValid implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    const usernameValidator = new RegExp('^[a-zd](?:[a-zd]|-(?=[a-zd])){0,38}$')
    return usernameValidator.test(username)
  }

  defaultMessage(args: ValidationArguments) {
    // Message when the username is invalid
    return 'Username - $value - is invalid. Please provide a valid username, it has to be alphanumeric and follow the GitHub username rules - https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/iam-configuration-reference/username-considerations-for-external-authentication#about-username-normalization'
  }
}
