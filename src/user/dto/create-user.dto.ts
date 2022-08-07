import { OmitType, PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsExist } from 'src/etc/validator/exists-validator';
import { IsUnique } from 'src/etc/validator/unique-validator';
import { User } from '../entities/user.entity';

export class UserDto {
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;

  @IsString()
  @MaxLength(200)
  fullname: string;

  @IsEmail()
  @IsUnique([User, 'email'])
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsUnique([User, 'username'])
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
export class CreateUserDto extends OmitType(UserDto, ['id']) {}

export class UserIdDto extends PickType(UserDto, ['id']) {}
