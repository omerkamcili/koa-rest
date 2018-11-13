import { UserEntity } from './user';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name: 'user_address'})
export default class UserAddressEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    detail: string;

    @ManyToOne(type => UserEntity, user => user.address)
    user: UserEntity;

}
