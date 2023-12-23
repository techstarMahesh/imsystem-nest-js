import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from '@nestjs/class-validator';

@ValidatorConstraint({ name: 'IsTrue', async: false })
export class IsTrueValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    return value === true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be true.`;
  }
}

export function IsTrue(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTrueValidator,
    });
  };
}
