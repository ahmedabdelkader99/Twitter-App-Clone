import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";

import { IDataloaders } from "./dataloader.interface";
import { TweetService } from "src/tweet/tweet.service";
import { Tweet } from "src/tweet/entities/tweet.entity";

@Injectable()
export class DataloaderService {
  constructor(private readonly tweetService: TweetService) {}

  getLoaders(): IDataloaders {
    const tweetsLoader = this._createTweetsLoader();
    return {
      tweetsLoader,
    };
  }

  private _createTweetsLoader() {
    return new DataLoader<number, Tweet>(
      async (keys: readonly number[]) =>
        await this.tweetService.getUsersTweetsByBatch(keys as number[]) // TODO : make a method inside the loader instead of injecting the service (to avoid circular dependecy)
    );
  }
}
