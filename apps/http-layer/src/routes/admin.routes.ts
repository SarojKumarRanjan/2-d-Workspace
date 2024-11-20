import { Router } from "express";

import {
    createElement,
    updateElement,
    createAvatar,
    createMap
} from "../controllers/admin.controller"

export const adminRouter = Router();

adminRouter.post("/create-element", createElement);
adminRouter.put("/update-element/:elementId", updateElement);
adminRouter.post("/create-avatar", createAvatar);
adminRouter.post("/create-map", createMap);

