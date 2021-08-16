import { IsEnum, IsNotEmpty, IsEmail, IsString, Min, Length } from 'class-validator';
import { Role } from '../type';

export class CreateUserDto {

    @Length(6, 15)
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @Length(6, 15)
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: string;
}