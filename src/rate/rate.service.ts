import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
    constructor(
        @InjectRepository(Rate)
        private readonly rateRepository: Repository<Rate>,
    ) {}

    async create(createRateDto: CreateRateDto) {
        const createRent = await this.rateRepository.create(createRateDto);
        await this.rateRepository.save(createRent);
        return createRent;
    }

    findAll() {
        return this.rateRepository.find();
    }

    async findOne(id: number) {
        const rate = await this.rateRepository.findOne(id);
        if (rate) {
            return rate;
        }
        throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
    }

    async update(id: number, updateRateDto: UpdateRateDto) {
        await this.rateRepository.update(id, updateRateDto);
        const updateRate = await this.rateRepository.findOne(id);
        if (updateRate) {
            return updateRate;
        }
        throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number) {
        const removeRate = await this.rateRepository.delete(id);
        if (!removeRate.affected) {
            throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
        }
    }
}
