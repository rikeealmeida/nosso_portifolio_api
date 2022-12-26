import { Router } from "express";
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  retrieveUser,
} from "../controllers/get-users";

const userRoutes: Router = Router();

userRoutes.get("/user", getUser);
userRoutes.post("/user", addUser);
userRoutes.put("/user/:id", updateUser);
userRoutes.delete("/user/:id", deleteUser);
userRoutes.get("/user/:id", retrieveUser);

export default userRoutes;
