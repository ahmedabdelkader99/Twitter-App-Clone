import { CreateReactInput } from './create-react.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReactInput extends PartialType(CreateReactInput) {
  @Field(() => Int)
  id: number;
}
