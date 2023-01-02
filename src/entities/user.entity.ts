import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
  } from "typeorm";
import { hashSync } from "bcryptjs";
import SchedulesUsersProperties from "./schedules_user_properties.entity";
  
@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  password: string;
  
  @Column()
  email: string;
  
  @Column()
  isAdm: boolean;
  
  @Column({default: true})
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @CreateDateColumn()
  @UpdateDateColumn()
  updatedAt: Date;
  
  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
  this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => SchedulesUsersProperties, schedules_users_properties => schedules_users_properties.users)
  schedules_users_properties: SchedulesUsersProperties[]

}

export default User;
