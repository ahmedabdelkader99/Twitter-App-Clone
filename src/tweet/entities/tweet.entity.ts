import { Field, ObjectType } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { React } from "src/likeReact/react.entity";
import { User } from "src/user/entities/user.entity";

@ObjectType()
@Table
export class Tweet extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column //TODO: regular string is varchar(255) in DB so if the length is more than that it would failed use TEXT instead 
  content: string;

  @Field()
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  @Exclude({ toPlainOnly: true })
  @Field(() => User)
  user: number;

  @HasMany(() => React, 'tweet_Id')
  @Field(type => [React],{nullable: 'items'})
  react: React[]
}
