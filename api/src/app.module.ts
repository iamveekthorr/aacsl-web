import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';
import { caching } from 'cache-manager';
import { HttpModule } from '@nestjs/axios';
import * as sqliteStore from 'cache-manager-sqlite';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { QueueModule } from './queue/queue.module';

import { ValidationPipe } from './pipes/validation.pipe';
import { GlobalExceptionsFilter } from './filters/global-exception.filter';

import { ResponseInterceptor } from './interceptors/response.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

import { UserMiddleware } from './middleware/guard.middleware';
import { TimeoutMiddleware } from './middleware/timeout.middleware';

import { typeOrmModulesOption } from './orm.config';
import { MileageModule } from './mileage/mileage.module';
import { BusinessModule } from './business/business.module';

import { validate } from './env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        typeOrmModulesOption(configService),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        const options = {
          store: sqliteStore,
          name: 'cache',
          path: `cache.db`,
        };
        return caching(options);
      },
    }),
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('DB_CONNECTION_TIMEOUT'),
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    EmailModule,
    QueueModule,
    MileageModule,
    BusinessModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    { provide: APP_FILTER, useClass: GlobalExceptionsFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtService,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude('/v1/auth/refresh')
      .forRoutes('*')
      .apply(TimeoutMiddleware)
      .forRoutes('*');
  }
}
