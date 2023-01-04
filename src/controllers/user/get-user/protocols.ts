import { IUser } from "../../../interfaces/user";


export interface IGetUserRepository {
    getUser(id: string): Promise<IUser>;
}
