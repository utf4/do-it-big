import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from 'src/entities/email.entity';
import { EmailReply } from 'src/entities/emailReply.entity';
import User from 'src/entities/user.entity';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { createUsersTable1685455068594 } from 'src/migrations/1685455068594-create_users_table';
dotenv.config({ path: '.env' });

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Email, EmailReply],
  migrations: [createUsersTable1685455068594],
  synchronize: false,
  migrationsRun: true,
};

export function getConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    migrations: ['src/migrations/*{.ts,.js}'],
    logging: true,
    migrationsTableName: 'migrations',
    entities: [User,Email,EmailReply],
  };
}
