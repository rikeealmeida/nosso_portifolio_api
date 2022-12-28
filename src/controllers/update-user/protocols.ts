import { IUser } from "../../models/user";
import { IJob } from "../../types/job";
import { HttpRequest, HttpResponse } from "../protocols";
export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
  title?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
  telNumber?: string;
  resume?: string;
  jobs?: IJob[];
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IUser>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<IUser>;
}
