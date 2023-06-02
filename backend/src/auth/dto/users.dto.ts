import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  @Length(2, 200)
  firstName: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string;
}
