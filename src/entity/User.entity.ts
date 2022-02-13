import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
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

    @ManyToOne(() => Role, { nullable: true })
    @JoinColumn({ name: 'roleId_id' })
    role: Role;

}
