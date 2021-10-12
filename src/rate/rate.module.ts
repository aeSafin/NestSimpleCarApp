import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hire } from '../hire/hire.entity';
import { Rate } from './rate.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hire, Rate])],
    controllers: [RateController],
    providers: [RateService],
})
export class RateModule {}
