import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Console } from "console";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { Tweet } from "./entities/tweet.entity";
import { TweetService } from "./tweet.service";
import { Int } from "@nestjs/graphql";

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tweet)
  createTweet(
    @CurrentUser() user,
    @Args("createTweetInputs") createTweetInputs: CreateTweetDto
  ) {
    return this.tweetService.createTweet(createTweetInputs, user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Tweet])
  findAllTweets(@Args("page", { type: () => Int }) page: number) { //NOTE: YOU NEED TO SPECIFY THE TYPE IF IT"S NUMBER "INT"
    return this.tweetService.findAllTweets(page);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Tweet])
  getAllTweetsByUserId(@Args("userId", { type: () => Int }) userId: number[]) { //NOTE: YOU NEED TO SPECIFY THE TYPE IF IT"S NUMBER "INT"
    return this.tweetService.getAllTweetsByUserIds(userId);
  }
}
