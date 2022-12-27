import { IUser } from "../../types/user";
import { HttpResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<HttpResponse<IUser[]>>;
}
export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>;
}
