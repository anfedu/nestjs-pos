import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsExist } from 'src/etc/validator/exists-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsString()
  @MaxLength(200)
  fullname: string;

  @IsEmail()
  @IsExist([User, 'email'])
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
