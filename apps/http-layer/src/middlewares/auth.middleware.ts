import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { resultFormatter } from "../utils/resultFormatter";

export const verifyUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  if (!token) {
    resultFormatter.throw("Token not found", 400);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    resultFormatter.throw("Invalid token", 400);
    return;
  }
}
);