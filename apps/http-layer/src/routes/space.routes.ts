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
export const spaceRouter = Router();

spaceRouter.post("/create", createSpace);
spaceRouter.delete("/:spaceId", deleteSpace);
spaceRouter.get("/my-spaces/all", getMyExistingSpaces);
spaceRouter.get("/:spaceId", getSpace);
spaceRouter.post("/add-element", addElement);
spaceRouter.delete("/delete-element/:elementId", deleteElement);
spaceRouter.get("/elements/all", getAllElements);
