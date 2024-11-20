import { Response } from "express";

export const resultFormatter = {
    success: (res: Response, data: any, message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },

    error: (res: Response, message = "An error occurred", statusCode = 500, error = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            error, // this in production
        });
    },

    throw: (message: string, statusCode = 500, error = null) => {
        const err = new Error(message);
        
        (err as any).statusCode = statusCode;
        (err as any).details = error;
        throw err;
    },
};
