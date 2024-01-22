import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { perPage } from "src/auth/constants";
import { User } from "src/user/entities/user.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { Tweet } from "./entities/tweet.entity";
import { where } from "sequelize";

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
  ) {}

  findAllTweets(page: number): Promise<Tweet[]> {
    const offset = (page - 1) * perPage;
    if (offset < 0) {
      const error = new Error("page must be greater than 0");
      throw error;
    }

    return this.tweetModel.findAll({ limit: perPage, offset, include: [User] });
  }

  createTweet(createTweetInputs: CreateTweetDto, user: User) {
    let createdTweet = this.tweetModel.create({
      content: createTweetInputs.content,
      userId: user.id,
    });
    if (!createdTweet) {
      const error = new Error("Invalid Inputs");
      throw error;
    }
    return createdTweet;
  }
   async getAllTweetsByUserIds(userIds: number[]) {
    return  await this.tweetModel.findAll({ where: {id: userIds}});
  }


  
  async getUsersTweetsByBatch(
    userIds:  number[],
  ): Promise<(Tweet | any)[]> {
    const tweets = await this.getAllTweetsByUserIds(userIds);
    const mappedResults = this._mapResultToIds(userIds, tweets);
    return mappedResults;
  }

  private _mapResultToIds(userIds: readonly number[], tweets: Tweet[]) {
    return userIds.map(
      (id) =>
        tweets.filter((tweet: Tweet) => tweet.userId === id) || null, //FIXME: this solution will only work fine for only one user if there is many users and the tweets is random the returned array would be mixed (not all users will have thier own tweets)
    );
  }
}
