import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, nullable: true })
    phone: string;

    @Column({ length: 100 })
    email: string;

}