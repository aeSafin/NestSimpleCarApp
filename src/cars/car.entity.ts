import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Hire } from '../hire/hire.entity';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200 })
    carBrand: string;

    @Column('varchar', { length: 200 })
    model: string;

    @Column({ width: 25, type: 'int' })
    govNumber: number;

    @Column('varchar', { length: 20 })
    vin: string;

    @OneToOne(() => Hire, (hire: Hire) => hire.car)
    hire: Hire;

    @Column({ default: true })
    isAvailable: boolean;
}
