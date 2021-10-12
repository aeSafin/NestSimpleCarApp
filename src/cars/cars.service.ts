import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
    ) {}

    // где отчет по средней загрузке???

    async create(createCarDto: CreateCarDto): Promise<Car> {
        // почему нельзя через create() или конструктор нормально описать?????
        const car = new Car();
        car.carBrand = createCarDto.carBrand;
        car.model = createCarDto.model;
        car.govNumber = createCarDto.govNumber;
        car.vin = createCarDto.vin;
        return this.carRepository.save(car);
    }

    findAll(): Promise<Car[]> {
        return this.carRepository.find();
    }

    async findOne(id: number): Promise<Car> {
        const car = await this.carRepository.findOne(id);
        if (car) {
            return car;
        }
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    async update(id: number, updateCarDto: UpdateCarDto) {
        await this.carRepository.update(id, updateCarDto);
        // updatedCar | это можно заменить на save() вместо двух запросов в базу
        const updateCar = await this.carRepository.findOne(id);
        if (updateCar) {
            return updateCar;
        }
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<void> {
        // removedCar
        const removeCar = await this.carRepository.delete(id);
        if (!removeCar.affected) {
            throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
        }
    }
}
