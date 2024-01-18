import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../users/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
class Prediction {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @ApiProperty()
  @ManyToOne(() => User, user => user.predictions)
  public user: User;

  @ApiProperty()
  @Column({nullable: true})
  public baseImageId: string;

  @ApiProperty()
  @Column({nullable: true})
  public predictionImageId: string;

  @ApiProperty()
  @Column({nullable: false})
  public timestamp: Date;
}

export default Prediction;
