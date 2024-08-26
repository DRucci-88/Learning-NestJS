import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string | null;

    @IsString()
    @IsOptional()
    password: string | null;
}