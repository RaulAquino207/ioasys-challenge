import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Department } from "./Department.entity";
import { User } from "./User.entity";

@Entity()
export class Enterprise {
  constructor(partial?: Partial<Enterprise>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enterpriseName: string;

  @Column()
  createAt: Date;

  @OneToMany(
    () => Department,
    (department) => department.id,
    {
      cascade: true,
    }
  )
  department: Department[];

  @OneToMany(
    () => User,
    (user) => user.id,
    {
      cascade: true,
    }
  )
  user: User[];
}
