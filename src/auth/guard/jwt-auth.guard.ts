import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { jwtConstants } from "../jwtConstants";
import {Request} from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private readonly jwtService: JwtService) {
        super(); // Call the parent constructor
      }
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        // This method is inherited from AuthGuard
    
        // You can access properties from the parent class here
        // For example, to get the challenge:
        // const challenge = this.getErrorChallenge();
    
        const request = context.switchToHttp().getRequest();
        console.log(request.headers.authorization);
        
        const token = this.extractTokenFromHeader(request);
    
        if (!token) {
          throw new UnauthorizedException();
        }
    
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret, //esto lo tengo que cambiar cuando no tenga ese archivo jwtConstants
          });
          request.user = payload;
        } catch (error) {
          throw new UnauthorizedException();
        }
    
        return true;
      }
    
      private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
      }
      
    
}