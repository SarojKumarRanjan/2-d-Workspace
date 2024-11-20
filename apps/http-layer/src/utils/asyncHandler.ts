import { Request, Response, NextFunction } from "express";

type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (children: AsyncHandlerFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(children(req, res, next)).catch((err) => {
            next(err);
        });
    };
};
