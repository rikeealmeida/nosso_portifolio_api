import { Router } from "express";
import {
  getUser,
  // addUser,
  updateUser,
  deleteUser,
  retrieveUser,
} from "../controllers/get-users";
import { GetUsersController } from "../controllers/get-users/get-users";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";

const userRoutes: Router = Router();

userRoutes.get("/user", getUser);
// userRoutes.post("/user", addUser);
userRoutes.put("/user/:id", updateUser);
userRoutes.delete("/user/:id", deleteUser);
userRoutes.get("/user/:id", retrieveUser);

export default userRoutes;
