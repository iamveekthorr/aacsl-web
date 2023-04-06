import { Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JWTPayload } from '../jwt-payload.type';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../dto/user.dto';
import { AppError } from '../../utils/appError.util';
import { ErrorMessage } from '../../enums/error-messages.enum';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JWTPayload): Promise<UserDto> {
    const { sub } = payload;

    // find user using the provided token
    const user = await this.userService.getUserById(sub);

    if (!user)
      throw new AppError(ErrorMessage.NO_USER_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }
}
