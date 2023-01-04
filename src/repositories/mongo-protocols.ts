import { IUser } from "../interfaces/user";

export type MongoUser = Omit<IUser, "id">