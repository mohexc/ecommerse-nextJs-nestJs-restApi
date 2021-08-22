
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text', { nullable: true })
    title: string;

    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column("text", { array: true })
    images: string[];

    @Column('text', { nullable: true })
    video: string;

    @Column()
    brand: string;

    @Column()
    category: string;

    @Column()
    countInStock: number;
}
