import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, nullable: true })
    phone: string;

    @Column({ length: 100, unique: true })
    email: string;

}