import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserSessionService } from '../services/user_session.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly sessionService: UserSessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret',
    });
  }

  async validate(payload: any) {
    // This payload is the decoded JWT token.
    // What we return here will be attached to the Request object as req.user
    const session = await this.sessionService.findSessionByUserIdOrDeviceId(payload.sub, null);
    if (!session) {
      throw new UnauthorizedException('Session expired or logged out');
    }
    return { userId: payload.sub, sub: payload.sub };
  }
}
