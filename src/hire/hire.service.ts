import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';
import { Hire } from './hire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HireService {
    constructor(
        @InjectRepository(Hire)
        private readonly hireRepository: Repository<Hire>,
    ) {}

    async create(createHireDto: CreateHireDto) {
        // зачем второй селект, где проверка на скидки?
        // где проверка на на выходные дни?
        // пауза бронирования???
        const hire = await this.hireRepository.query(`
            select
            "hire.carId",
            "hire.rateId",
            "hire.createRateDate",
            "hire.endRateDate",
            "hire.endRateDate"::date - "hire.createRateDate"::date as days,
            (select days * rate.price)
            from hire, rate
            `);
        hire.car = createHireDto.car;
        hire.rate = createHireDto.rate;
        hire.createRateDate = createHireDto.createRateDate;
        hire.endRateDate = createHireDto.endRateDate;

        if (hire.days > 30) {
            throw new HttpException(
                'Сar rental no more than 30 days',
                HttpStatus.FORBIDDEN,
            );
        }
        await this.hireRepository.save(hire);
        return hire;
    }

    findAll(): Promise<Hire[]> {
        return this.hireRepository.find();
    }

    async findOne(id: number): Promise<Hire> {
        const hire = await this.hireRepository.findOne(id);
        if (hire) {
            return hire;
        }
        throw new HttpException('Hire not found', HttpStatus.NOT_FOUND);
    }

    async update(id: number, updateHireDto: UpdateHireDto) {
        await this.hireRepository.update(id, updateHireDto);
        const updateHire = await this.hireRepository.findOne(id);
        if (updateHire) {
            updateHire;
        }
        throw new HttpException('Hire not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number) {
        const removeHire = await this.hireRepository.delete(id);
        if (!removeHire.affected) {
            throw new HttpException('Hire not found', HttpStatus.NOT_FOUND);
        }
        await this.hireRepository.delete(id);
    }
}
