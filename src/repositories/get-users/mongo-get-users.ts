import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { IUser } from "../../types/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    return [
      {
        firstName: "string",
        lastName: "string",
        title: "string",
        imageUrl: "string",
        linkedinUrl: "string",
        instagramUrl: "string",
        githubUrl: "string",
        telNumber: "string",
        email: "string",
        resume: "string",
        jobs: [],
      },
    ];
  }
}
