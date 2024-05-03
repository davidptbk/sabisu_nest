import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    
    return this.authService.register(registerAuthDto)
    
    console.log({body: registerAuthDto});
    
    /* const token = await this.authService.register(registerAuthDto);
    return { access_token: token.access_token }; */
  }

  @Post('login')
  async loginUser(@Body() loginAuthDto: LoginAuthDto){
    return this.authService.login(loginAuthDto)

  }

 
}
