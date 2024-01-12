import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  @MaxLength(100)
  bio: string;

  @Field()
  @IsString()
  @MaxLength(240)
  avatar: string;
}
