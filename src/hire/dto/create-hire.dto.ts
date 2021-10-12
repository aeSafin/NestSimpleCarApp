import { Car } from '../../cars/car.entity';
import { IsDate } from 'class-validator';
import { Rate } from '../../rate/rate.entity';

export class CreateHireDto {
    car: Car;

    @IsDate()
    readonly createRateDate: string;

    @IsDate()
    readonly endRateDate: string;

    rate: Rate;
}
