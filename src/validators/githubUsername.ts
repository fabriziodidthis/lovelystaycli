import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isGithubUsernameValid', async: false })
export class isGithubUsernameValid implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    const usernameValidator = new RegExp('^[a-zd](?:[a-zd]|-(?=[a-zd])){0,38}$')
    return usernameValidator.test(username)
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Username ($value) is invalid. Please provide a valid username';
  }
}