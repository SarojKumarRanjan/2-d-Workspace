import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";

import {
    createElement,
    updateElement,
    createAvatar,
    createMap
} from "../controllers/admin.controller"
import { upload } from "../middlewares/multer.middleware";

export const adminRouter = Router();

adminRouter.post("/create-element",
     adminMiddleware,
     upload.single("thumbnail"),
     createElement);
adminRouter.put("/update-element/:elementId",
     adminMiddleware,
     upload.single("thumbnail"),
     updateElement);
adminRouter.post("/create-avatar",
     adminMiddleware,
     upload.single("thumbnail"),
     createAvatar);
adminRouter.post("/create-map",
     adminMiddleware,
     upload.single("thumbnail"),
     createMap);

