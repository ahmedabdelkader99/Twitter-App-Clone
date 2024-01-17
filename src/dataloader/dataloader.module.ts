import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { TweetService } from "src/tweet/tweet.service";
@Module({
  //providers: [DataloaderService , TweetService],
  //exports:[DataloaderService]
})
export class DataloaderModule {}
