import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig: DataSourceOptions = {
  type: 'mssql',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  options: {
    connectTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT),
  },
  synchronize: false,
  migrations: ['src/migration/*{.ts,.js}'],
};

export default new DataSource(dbConfig);
