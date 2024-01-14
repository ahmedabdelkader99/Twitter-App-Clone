import { Module } from "@nestjs/common";
import { TweetService } from "./tweet.service";
import { TweetResolver } from "./tweet.resolver";
import { Tweet } from "./entities/tweet.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { TweetLoader } from "src/dataloader/tweetLoader";

@Module({
  imports: [SequelizeModule.forFeature([Tweet])],

  providers: [TweetService, TweetResolver, TweetLoader],
})
export class TweetModule {}
