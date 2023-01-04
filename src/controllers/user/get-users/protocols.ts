import { IUser } from "../../../interfaces/user";


export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>;
}
