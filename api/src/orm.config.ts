import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env.validate';

export const typeOrmModulesOption = (configService: ConfigService) =>
  ({
    type: 'mssql',
    host: configService.get<string>('HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize:
      configService.get<string>('NODE_ENV') !== Environment.PRODUCTION,
    entities: [`${__dirname}/**/*.entity.ts`],
    migrationsRun:
      configService.get<string>('NODE_ENV') === Environment.PRODUCTION,
    logging: true,
    autoLoadEntities: true,
    options: {
      connectTimeout: parseInt(
        configService.get<string>('DB_CONNECTION_TIMEOUT'),
      ),
    },
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as TypeOrmModuleOptions);
