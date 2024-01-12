import { Module } from "@nestjs/common";
import { ReactService } from "./react.service";
import { ReactResolver } from "./react.resolver";
import { React } from "./react.entity";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([React])],
  providers: [ReactResolver, ReactService],
})
export class ReactModule {}
