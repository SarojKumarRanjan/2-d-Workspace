import { Router } from "express";
import {
    createSpace,
    deleteSpace,
    getMyExistingSpaces,
    getSpace,
    addElement,
    deleteElement,
    getAllElements
} from "../controllers/space.controller"
import { verifyUser } from "../middlewares/auth.middleware";
export const spaceRouter = Router();

spaceRouter.post("/create",verifyUser, createSpace);
spaceRouter.delete("/:spaceId",verifyUser, deleteSpace);
spaceRouter.get("/my-spaces/all",verifyUser, getMyExistingSpaces);
spaceRouter.get("/:spaceId",verifyUser, getSpace);
spaceRouter.post("/add-element", addElement);
spaceRouter.delete("/delete-element/:elementId", deleteElement);
spaceRouter.get("/elements/all", getAllElements);
