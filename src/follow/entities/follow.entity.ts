import { Field, ObjectType } from "@nestjs/graphql";
import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@ObjectType()
@Table
export class UserFollowingEntity extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @ForeignKey(() => User)
  @Column
  followerId: number;

  @Field()
  @ForeignKey(() => User)
  @Column
  followeeId: number;
}
