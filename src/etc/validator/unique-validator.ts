import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const constrains = args.constraints;
    const find = { [constrains[1]]: args.value };
    const check = await getConnection().getRepository(User).findOne(find);
    if (check) return false;
    return true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return args.property + ' ' + args.value + ' sudah digunakan';
  }
}

export function IsUnique(options: any, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: options,
      options: validationOptions,
      validator: UniqueValidator,
      async: true,
    });
  };
}
