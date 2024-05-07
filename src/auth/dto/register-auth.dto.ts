import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterAuthDto extends LoginAuthDto {
    @IsNotEmpty()
    name:string


    //no se que tan necesario es o no que cuando se registre un usuario este se pueda poner su rol
    @IsOptional()
    role:string
}
