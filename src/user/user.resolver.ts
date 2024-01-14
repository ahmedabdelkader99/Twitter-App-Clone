import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User, UserProfile } from "./entities/user.entity";
import { UserService } from "./user.service";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  findUserProfile(@CurrentUser() user,) {
    return this.userService.getUserprofile(user);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  findAllUsers(@CurrentUser() user, @Args("page") page: number) {
    return this.userService.findAllUsers(page);
  }

  //////////////
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  findUserTweets(@CurrentUser() user) {
    return this.userService.findUserTweets(user);
  }
}
