import { IUser } from "../../../interfaces/user";


export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<IUser>;
}
