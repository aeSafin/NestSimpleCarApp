import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Hire } from '../hire/hire.entity';

@Entity()
export class Rate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    name: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    km: number;

    @OneToOne(() => Hire, (hire: Hire) => hire.rate)
    hire: Hire;
}
