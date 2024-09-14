import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  hobby: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
