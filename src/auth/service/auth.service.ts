import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import {hash, compare} from 'bcrypt'
import { User } from 'src/modules/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

 constructor( @InjectModel(User.name) private readonly userModel:Model<User>,
 private readonly usersService: UsersService,
private readonly jwtService:JwtService,
private readonly configService: ConfigService
){}

  //constructor(private readonly authService: AuthService){}
  
async register(userRegister:RegisterAuthDto){
  const {password,email}=userRegister
    
 /*  const userExist= await this.usersService.findOneByEmailToRegister(email)
      
  if(userExist){
    throw new NotFoundException(`User with email ${email} already exists`);
  } */

 /*  userRegister.role = userRegister.role || 'user'; // Asignar 'user' si role no se envía

 console.log(userRegister.role); */
 
  
  const plainToHash= await hash(password, 10) //retorna la contraseña con hash

  userRegister={...userRegister,password:plainToHash}

  return this.usersService.create(userRegister)

    //return this.userModel.create(userRegister) //crea un nuevo usuario a partir de mongoose
  }

  async login(userLogin:LoginAuthDto){
    const {email, password}=userLogin
    const findUser = await this.userModel.findOne({email:email})

    if (!findUser) throw new HttpException('User not found', 404)
    
    const isPasswordValid = await compare (password, findUser.password) //me retorna un true o un false

    if (!isPasswordValid) throw new HttpException('Incorrect password/contraseña incorrecta', 403)
    
  const payload= {id: findUser._id, name: findUser.name} //Carga util
   const token =  this.jwtService.sign(payload) //firma del JWT
    
      const data= {
        role: findUser.role,
        token: token,
      };

    return data;
  }

  
}
