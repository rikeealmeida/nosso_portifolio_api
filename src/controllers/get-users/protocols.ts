import { IUser } from "../../types/user";

export interface IGetUsersController {
  handle(): any;
}
export interface IGetUsersRepository {
  getUsers(): Promise<IUser>[];
}
