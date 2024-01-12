import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileResolver } from "./profile.resolver";
import { Profile } from "./entities/profile.entity";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Profile])],

  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
