import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Car } from '../cars/car.entity';
import { Rate } from '../rate/rate.entity';

@Entity()
export class Hire {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Car, {
        eager: true,
    })
    @JoinColumn()
    car: Car;

    @OneToOne(() => Rate, {
        eager: true,
    })
    @JoinColumn()
    rate: Rate;

    @Column({ type: 'date' })
    createRateDate: string;

    @Column({ type: 'date' })
    endRateDate: string;
}
