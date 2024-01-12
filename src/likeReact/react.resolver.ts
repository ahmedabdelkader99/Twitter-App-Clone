import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { React } from "./react.entity";
import { Query, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { ReactService } from "./react.service";
import { UserService } from "src/user/user.service";
import { TweetService } from "src/tweet/tweet.service";
import { CreateReactInput } from "./dto/create-react.input";

@Resolver(() => React)
@UseGuards(GqlAuthGuard)
export class ReactResolver {
  constructor(
    private readonly reactService: ReactService,
    private readonly userService: UserService,
    private readonly tweetService: TweetService
  ) {}

  @Mutation(() => React)
  createReact(@Args("createReactInput") createReactInput: CreateReactInput) {
    return this.reactService.createReact(createReactInput);
  }
}
