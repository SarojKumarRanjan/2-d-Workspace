import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";

import {
    createElement,
    updateElement,
    createAvatar,
    createMap
} from "../controllers/admin.controller"

export const adminRouter = Router();

adminRouter.post("/create-element", adminMiddleware,createElement);
adminRouter.put("/update-element/:elementId",adminMiddleware, updateElement);
adminRouter.post("/create-avatar",adminMiddleware, createAvatar);
adminRouter.post("/create-map",adminMiddleware, createMap);

