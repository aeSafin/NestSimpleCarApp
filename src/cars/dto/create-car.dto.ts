import {
    IsInt,
    Length,
    Max,
    Min,
    IsNumberString,
    IsBoolean,
} from 'class-validator';

export class CreateCarDto {
    @Length(20)
    carBrand: string;

    @Length(20)
    model: string;

    @IsInt()
    @Max(15)
    @Min(5)
    govNumber: number;

    @IsNumberString()
    @Length(25)
    vin: string;

    @IsBoolean()
    readonly isAvailable: boolean;
}
