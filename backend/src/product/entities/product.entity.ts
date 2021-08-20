
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column("text", { array: true })
    images: string[];

    @Column()
    video: string;
}
