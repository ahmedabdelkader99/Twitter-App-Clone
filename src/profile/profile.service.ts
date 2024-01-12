import { Injectable } from "@nestjs/common";
import { CreateProfileInput } from "./dto/create-profile.input";
import { UpdateProfileInput } from "./dto/update-profile.input";
import { User } from "src/user/entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private profileModel: typeof Profile
  ) {}
  create(createProfileInput: CreateProfileInput, user: User) {
    let createdProfile = this.profileModel.create({
      bio: createProfileInput.bio,
      avatar: createProfileInput.avatar,
      userId: user.id,
    });
    if (!createdProfile) {
      const error = new Error("Invalid Inputs");
      throw error;
    }
    return createdProfile;
  }
}
