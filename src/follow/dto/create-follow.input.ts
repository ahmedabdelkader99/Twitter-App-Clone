import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class CreateFollowInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  followeeId: number;
}
