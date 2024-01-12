import { Field, ObjectType } from "@nestjs/graphql";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { UserFollowingEntity } from "./user-followings.entity";
import { React } from "src/likeReact/react.entity";
import { profile } from "console";
import { Profile } from "src/profile/entities/profile.entity";

@ObjectType()
@Table
export class User extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @Field()
  @Column
  name: string;
  @Field()
  @Column({ unique: true })
  email: string;
  @Field()
  @Column
  password: string;

  @HasMany(() => React, "user_Id")
  @Field((type) => [React], { nullable: "items" })
  react: React[];

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets: Tweet[];

  @HasOne(() => Profile)
  @Field(() => Profile, { nullable: true })
  user: User;
  profile: Profile;

  @BelongsToMany(
    () => User,
    () => UserFollowingEntity,
    "followeeId",
    "followerId"
  )
  @Field(() => [User], { nullable: true })
  followers: User[];

  @BelongsToMany(
    () => User,
    () => UserFollowingEntity,
    "followerId",
    "followeeId"
  )
  @Field(() => [User], { nullable: true })
  follwing: User[];
}
