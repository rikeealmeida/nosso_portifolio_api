import { IUser } from "../../../interfaces/user";
import { IJob } from "../../../interfaces/job";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  password: string;
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
