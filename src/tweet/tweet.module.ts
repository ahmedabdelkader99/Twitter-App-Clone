import { Module } from "@nestjs/common";
import { TweetService } from "./tweet.service";
import { TweetResolver } from "./tweet.resolver";
import { Tweet } from "./entities/tweet.entity";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Tweet])],

  providers: [TweetService, TweetResolver],
  exports : [TweetService] // NOTE: make sure to export the service to use it in other modules
})
export class TweetModule {}
