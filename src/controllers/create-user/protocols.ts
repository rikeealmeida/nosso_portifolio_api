import { IUser } from "../../models/user";
import { IJob } from "../../types/job";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  title: string;
  imageUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  githubUrl: string;
  telNumber: string;
  email: string;
  resume: string;
  jobs: IJob[];
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<IUser>;
}
