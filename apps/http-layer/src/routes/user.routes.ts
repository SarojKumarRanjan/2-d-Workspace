import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";

import {
    login,
    register,
    updateMetadata,
    getAvailableAvatars,
    getUsersMetadata
} from "../controllers/user.controller"

export const userRouter = Router();

userRouter.post("/signin", login);
userRouter.post("/signup", register);
userRouter.put("/update-metadata",verifyUser, updateMetadata);
userRouter.get("/avatars",verifyUser, getAvailableAvatars);
userRouter.get("/metadata", verifyUser, getUsersMetadata);