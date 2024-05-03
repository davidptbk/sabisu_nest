import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {hash, compare} from 'bcrypt'
import { User } from 'src/modules/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

 constructor( @InjectModel(User.name) private readonly userModel:Model<User>,
private jwtService:JwtService
){}

  //constructor(private readonly authService: AuthService){}
  
  async register(userRegister:RegisterAuthDto){
    const {password}=userRegister

    const plainToHash= await hash(password, 10) //retorna la contraseña con hash

    userRegister={...userRegister,password:plainToHash}

    return this.userModel.create(userRegister)
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
        user: findUser,
        token: token,
      };

    return data;
  }
}
