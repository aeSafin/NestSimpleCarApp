import { Hire } from '../../hire/hire.entity';
import { IsInt, Length, Max, Min } from 'class-validator';

export class CreateRateDto {
    @Length(10, 20, {
        message: 'Incorrect length!',
    })
    name: string;

    @IsInt()
    @Min(0)
    @Max(10)
    price: number;

    @IsInt()
    km: number;

    hire: Hire;
}
