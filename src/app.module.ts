import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { HireModule } from './hire/hire.module';
import { RateModule } from './rate/rate.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
    imports: [
        CarsModule,
        HireModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            JWT_SECRET: String(process.env.JWT_SECRET),
            JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
            autoLoadEntities: true,
            synchronize: true,
            migrations: ['migration/*.js'],
            cli: {
                migrationsDir: 'migration',
            },
        }),
        RateModule,
        UsersModule,
        AuthenticationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
