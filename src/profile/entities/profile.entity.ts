import { Field, ObjectType } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { User } from "src/user/entities/user.entity";

@ObjectType()
@Table
export class Profile extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column
  bio: string;
  @Field()
  @Column
  avatar: string;

  @Field()
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Field()
  @ForeignKey(() => Tweet)
  @Column
  tweetId: number;

  @BelongsTo(() => User)
  @Exclude({ toPlainOnly: true })
  @Field(() => User)
  user: number;
}
