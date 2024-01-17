import DataLoader from "dataloader";
import { Tweet } from "src/tweet/entities/tweet.entity";

export interface IDataloaders {
  tweetsLoader: DataLoader<number, Tweet>;
}
