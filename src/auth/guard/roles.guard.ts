import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean  {

    const roles= this.reflector.getAllAndOverride('roles',[
      context.getHandler(),
      context.getClass(),
    ])

    if(!roles){
      return true;
    }
    
    return true;
  }
}
