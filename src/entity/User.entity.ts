import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Role } from "./Role.entity";

@Entity()
export class User {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
      }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    createAt: Date;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(
    () => Role,
    role => role.id,
    )
    @JoinColumn({ name: 'roleId' })
    role: Role;

}
