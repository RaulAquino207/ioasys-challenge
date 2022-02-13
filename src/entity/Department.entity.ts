import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Enterprise } from "./Enterprise.entity";

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
}
