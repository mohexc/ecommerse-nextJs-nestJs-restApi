import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ length: 60 })
    password: string;

    @Column()
    email: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    role: string
}
