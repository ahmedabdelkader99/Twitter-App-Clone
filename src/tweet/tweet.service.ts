import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { perPage } from "src/auth/constants";
import { User } from "src/user/entities/user.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { Tweet } from "./entities/tweet.entity";
import { TweetLoader } from "src/dataloader/tweetLoader";

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
    private readonly tweetLoader: TweetLoader
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
  getAllTweetsByUserId(userId: number): Promise<Tweet[]> {
    return this.tweetLoader.load(userId);
  }
}
