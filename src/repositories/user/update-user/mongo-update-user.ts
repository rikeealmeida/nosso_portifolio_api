
import { ObjectId } from "mongodb";
import { IUpdateUserRepository, UpdateUserParams } from "../../../controllers/user/update-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../interfaces/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<IUser> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}