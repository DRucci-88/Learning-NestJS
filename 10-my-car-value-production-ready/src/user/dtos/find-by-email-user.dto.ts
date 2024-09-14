import { IsEmail } from 'class-validator';

export class FindByEmailUserDto {
  @IsEmail()
  email: string;
}
