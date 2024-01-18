import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "./models/role.model";
import Prediction from "../prediction/prediction.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Prediction, prediction => prediction.user)
  predictions: Prediction[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
