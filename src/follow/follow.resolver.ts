import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { FollowService } from "./follow.service";
import { UserFollowingEntity } from "./entities/follow.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateFollowInput } from "./dto/create-follow.input";

@Resolver(() => UserFollowingEntity)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserFollowingEntity)
  followUser(
    @CurrentUser() user,
    @Args("createFollowInput") createFollowInput: CreateFollowInput
  ) {
    return this.followService.createUserFollowRelation(createFollowInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getFolllwers(@CurrentUser() user) {
    return this.followService.getUserfolllwers(user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getFolllwing(@CurrentUser() user) {
    return this.followService.getUserfolllwing(user);
  }
}
