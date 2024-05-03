import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    name:string


    //no se que tan necesario es o no que cuando se registre un usuario este se pueda poner su rol
    @IsNotEmpty()
    role:string
}
