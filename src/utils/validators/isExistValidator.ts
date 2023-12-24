import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'IsExist', async: false })
export class IsExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  validate(value: any, args: ValidationArguments) {
    console.log(value);
    console.log(args);
    return value !== undefined && value !== null;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must exist.`;
  }
}
