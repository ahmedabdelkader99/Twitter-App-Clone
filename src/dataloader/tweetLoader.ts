// src/dataloaders/tweet.loader.ts

import * as DataLoader from "dataloader";
import { Injectable } from "@nestjs/common";
import { Tweet } from "src/tweet/entities/tweet.entity";

@Injectable()
export class TweetLoader {
  private tweetLoader: DataLoader<number, Tweet[]>;

  constructor() {
    this.tweetLoader = new DataLoader<number, Tweet[]>(
      this.batchLoadTweets.bind(this)
    );
  }

  async batchLoadTweets(userIds: number[]): Promise<Tweet[][]> {
    const tweetsByUser = await this.fetchTweetsByUserIds(userIds);

    return userIds.map((userId) => tweetsByUser[userId] || []);
  }

  async fetchTweetsByUserIds(
    userIds: number[]
  ): Promise<{ [key: number]: Tweet[] }> {
    const tweets = await Tweet.findAll({ where: { userId: userIds } });
    return {};
  }

  load(userId: number): Promise<Tweet[]> {
    return this.tweetLoader.load(userId);
  }
}
