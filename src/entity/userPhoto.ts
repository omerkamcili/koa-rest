import { UserEntity } from './user';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({name: 'photo'})
export class UserPhotoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => UserEntity, user => user.photos)
    user: UserEntity;

}