import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const jobSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  employerImage: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    linkedinUrl: {
      type: String,
      required: true,
      unique: true,
    },
    instagramUrl: {
      type: String,
      required: true,
      unique: true,
    },
    githubUrl: {
      type: String,
      required: true,
      unique: true,
    },
    telNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    resume: {
      type: String,
      required: true,
    },
    jobs: {
      type: [jobSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
