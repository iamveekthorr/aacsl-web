import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueModule } from '../queue/queue.module';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { User } from '../user/user.entity';
import { Token } from './token.entity';

import { JwtRefreshGuard } from './jwt-refresh.guard';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    QueueModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    JwtRefreshGuard,
  ],
})
export class AuthModule {}
