import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getConnection } from 'typeorm';

@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const find = { [args.constraints[1]]: args.value };
    const check = await getConnection()
      .getRepository(args.constraints[0])
      .findOne(find);

    if (check) return false;
    return true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return args.property + ' ' + args.value + ' is exists';
  }
}

export function IsExist(options: any, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: options,
      options: validationOptions,
      validator: ExistsValidator,
      async: true,
    });
  };
}
