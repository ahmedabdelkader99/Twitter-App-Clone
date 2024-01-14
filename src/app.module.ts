import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { TweetModule } from "./tweet/tweet.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/entities/user.entity";
import { Tweet } from "./tweet/entities/tweet.entity";
import { AuthModule } from "./auth/auth.module";
import { React } from "./likeReact/react.entity";

import { FollowModule } from "./follow/follow.module";
import { UserFollowingEntity } from "./follow/entities/follow.entity";

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/graphql-schema.gql"),
    }),
    TweetModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 4000,
      username: "postgres",
      password: "0000",
      database: "twitter",
      models: [User, Tweet, UserFollowingEntity, React],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    FollowModule,
    TweetModule,
  ],
})
export class AppModule {}
