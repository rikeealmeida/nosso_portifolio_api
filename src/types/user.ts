import { Document } from "mongoose";
import { IJob } from "./job";

export interface IUser extends Document {
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
