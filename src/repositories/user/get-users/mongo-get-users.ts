import { IGetUsersRepository } from "../../../controllers/user/get-users/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../interfaces/user";
import { MongoUser } from "../../mongo-protocols";


export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
