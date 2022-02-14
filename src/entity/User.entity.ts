import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Enterprise } from "./Enterprise.entity";
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
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => Enterprise, (enterprise) => enterprise.id)
    @JoinColumn({ name: "enterpriseId" })
    enterprise: Enterprise;

}
