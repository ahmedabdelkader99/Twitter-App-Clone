import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { React } from "./react.entity";
import { CreateReactInput } from "./dto/create-react.input";

@Injectable()
export class ReactService {
  constructor(@InjectModel(React) private reactModel: typeof React) {}

  async createReact(createReactInput: CreateReactInput): Promise<React> {
    // should be {...createReactInput}
    return await this.reactModel.create({ ...createReactInput });
  }
}
