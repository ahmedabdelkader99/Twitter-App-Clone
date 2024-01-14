import { InjectModel } from "@nestjs/sequelize";
import { Tweet } from "src/tweet/entities/tweet.entity";

import { perPage } from "src/auth/constants";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserProfile } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const createdUser = this.userModel.create({ name, email, password });
    if (!createdUser) {
      const error = new Error("Invalid Inputs");
      throw error;
    }
    return;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("user not found");
      throw error;
    }
    return user;
  }
  async getUserprofile(name: string): Promise<User> {
    const user = this.userModel.findOne({ where: { name: name } });
    if (!user) {
      const error = new Error("user not found");
      throw error;
    }
    return user;
  }

  async findAllUsers(page: number): Promise<User[]> {
    const offset = (page - 1) * perPage;
    if (offset < 0) {
      const error = new Error("page must be greater than 0");
      throw error;
    }
    return this.userModel.findAll({ limit: perPage, offset: offset });
  }
  async findUserTweets(user: User): Promise<User> {
    const tweetcount = await this.userModel.count({
      where: { id: user.id },
      include: [Tweet], // association between User and Tweet models
    });
    return this.userModel.findOne({ where: { id: user.id }, include: [Tweet] });
  }
}
