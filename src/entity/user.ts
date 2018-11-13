import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserPhotoEntity } from "./userPhoto";
import UserAddressEntity from "./userAddress";

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

    @OneToMany(type => UserPhotoEntity, photo => photo.user)
    photos: UserPhotoEntity[];

    @OneToMany(type => UserAddressEntity, address => address.user)
    address: UserAddressEntity[];
    
}
