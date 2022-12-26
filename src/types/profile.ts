import { Document } from "mongoose";
import { IJob } from "../types/job"

export interface IUserProfile extends Document {
    firstName: string;
    lastName: string;
    title: string,
    imageUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    githubUrl: string;
    telNumber: string;
    email: string;
    resume: string;
    jobs: IJob[];
}