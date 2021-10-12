import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Hire } from '../hire/hire.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Car, Hire])],
    controllers: [CarsController],
    exports: [CarsService],
    providers: [CarsService],
})
export class CarsModule {}
