import { Router } from "express";
import {
    getUserProfiles,
    addUserProfile,
    updateUserProfile,
    deleteUserProfile,
    retrieveUserProfile,
} from "../controllers/userProfile";

const profileRoutes: Router = Router();

profileRoutes.get("/profile", getUserProfiles);
profileRoutes.post("/profile", addUserProfile);
profileRoutes.put("/profile/:id", updateUserProfile);
profileRoutes.delete("/profile/:id", deleteUserProfile);
profileRoutes.get("/profile/:id", retrieveUserProfile);

export default profileRoutes;