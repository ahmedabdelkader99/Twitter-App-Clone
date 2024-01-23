import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { TweetModule } from "src/tweet/tweet.module";
@Module({
  //FIXME: use only dataloader Services to avoid circular dependecy
  imports : [TweetModule], //NOTE: import Module instead
  providers: [DataloaderService], // NOTE: DO NOT USE EXTERNAL SERVICEs HERE USE JUST MODULE SERVICES AS PROVIDERS
  exports:[DataloaderService]
})
export class DataloaderModule {}
