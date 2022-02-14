import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Enterprise } from "./Enterprise.entity";
import { User } from "./User.entity";

@Entity()
export class Department {
  constructor(partial?: Partial<Department>) {
    Object.assign(this, partial);
  }
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentName: string;

  @Column()
  createAt: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.id)
  @JoinColumn({ name: "enterpriseId" })
  enterprise: Enterprise;

  @OneToMany(
    () => User,
    user => user.id,
  )
  users: User;
}
