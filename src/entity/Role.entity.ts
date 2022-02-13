import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Role {
  constructor(partial?: Partial<Role>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  @Column()
  roleTag: string;

  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User;
}
