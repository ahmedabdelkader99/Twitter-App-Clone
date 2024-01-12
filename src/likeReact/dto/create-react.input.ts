import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateReactInput {

  @IsNumber()
  @Field(type => Int)
  user_Id: number;

  @IsNumber()
  @Field(type => Int)
  tweet_Id: number;
  
}
