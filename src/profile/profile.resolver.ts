import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";
import { Profile } from "./entities/profile.entity";
import { CreateProfileInput } from "./dto/create-profile.input";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/user/decorator/current-user.decorator";

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  createProfile(
    @CurrentUser() user,
    @Args("createProfileInput") createProfileInput: CreateProfileInput
  ) {
    return this.profileService.create(createProfileInput ,user);
  }
}
