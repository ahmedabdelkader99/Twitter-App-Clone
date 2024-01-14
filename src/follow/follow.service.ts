import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFollowInput } from "./dto/create-follow.input";
import { UserFollowingEntity } from "./entities/follow.entity";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(UserFollowingEntity)
    private UserFollowingmodel: typeof UserFollowingEntity
  ) {}

  async createUserFollowRelation(
    createFollowInput: CreateFollowInput,
    user: User
  ) {
    const { followeeId } = createFollowInput;

    // Find the user to be followed (followee) based on followeeId
    const followee = await this.UserFollowingmodel.findOne({
      where: { id: followeeId },
    });
    // Check if the followee exists
    if (!followee) {
      throw new NotFoundException("User not found id: " + followeeId);
    }
    // Create a follow relationship in the UserFollowingmodel
    return await this.UserFollowingmodel.create({
      followerId: user.id,
      followeeId: followeeId,
    });
  }
  async getUserfolllwers(user: User): Promise<UserFollowingEntity[]> {
    return this.UserFollowingmodel.findAll({
      where: { id: user.id },
      include: [{ model: User, as: "followers" }],
    });
  }

  async getUserfolllwing(user: User): Promise<UserFollowingEntity[]> {
    return this.UserFollowingmodel.findAll({
      where: { id: user.id },
      include: [{ model: User, as: "follwing" }],
    });
  }
}
