import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { resultFormatter } from "../utils/resultFormatter";


export const adminMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  if (!token) {
    resultFormatter.throw("Token not found", 400);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
    if (decoded.role !== "admin") {
      resultFormatter.throw("You are not authorized", 401);
      return;
    }
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    resultFormatter.throw("Invalid token", 400);
    return;
  }
}
);
