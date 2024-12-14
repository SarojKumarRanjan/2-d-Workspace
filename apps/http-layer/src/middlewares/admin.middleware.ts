import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

import { resultFormatter } from "../utils/resultFormatter";
import jwt from "jsonwebtoken";


export const adminMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  //console.log("headers",req.headers);
  
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  //console.log(process.env.JWT_SECRET);
  
  //console.log(token)
  if (!token) {
    resultFormatter.throw("Token not found", 400);
    return;
  }

  try {
    //console.log("inside try block")
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as { userId: string, role: string };
    //console.log(decoded)
    if (decoded.role !== "admin") {
      //console.log("You are not authorized")
      resultFormatter.throw("You are not authorized", 401);
      return;
    }
    //console.log("You are authorized")
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    resultFormatter.throw("Invalid token", 400);
    return;
  }
}
);
