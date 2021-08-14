import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../type';

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: string;
}