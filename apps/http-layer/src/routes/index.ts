import { Router } from "express";
import { userRouter } from "./user.routes";
import { adminRouter } from "./admin.routes";
import { spaceRouter } from "./space.routes";
import { Request, Response, NextFunction } from "express";
import { resultFormatter } from "../utils/resultFormatter";

export const router = Router();

 

 const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || "Internal Server Error";

    
    const errorDetails = process.env.NODE_ENV === "development" ? err.details || null : null;

    
    console.error(err);

    
    resultFormatter.error(res, message, statusCode, errorDetails);
};



router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/space", spaceRouter);
router.use(errorHandler);
