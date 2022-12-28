import { IJob } from "../types/job";

export interface IUser {
  id: string;
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
