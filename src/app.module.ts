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
import { DataloaderModule } from "./dataloader/dataloader.module";
import { DataloaderService } from "./dataloader/dataloader.service";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    DataloaderModule,
    UserModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), "src/graphql-schema.gql"),
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/graphql-schema.gql"),
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: true,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
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
