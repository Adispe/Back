import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../users/user.entity";

@Entity()
class Prediction {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, user => user.predictions)
  public user: User;

  @Column({nullable: false})
  public baseImageId: string;

  @Column({nullable: false})
  public predictionImageId: string;

  @Column({nullable: false})
  public timestamp: Date;
}

export default Prediction;
