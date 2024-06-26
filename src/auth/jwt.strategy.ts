import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './jwtConstants';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

 /*  validate(payload: any)  {

    const decodedPayload = jwt.verify(token, jwtConstants.secret);

  // Extracción de información del usuario de la carga útil decodificada
  const userId = decodedPayload.userId;
  const username = decodedPayload.username;

  // Buscar el usuario en la base de datos usando el userId
  return this.usersService.findOneById(userId);
    //return { userId: payload.id, username:payload.name};
  } */

}

