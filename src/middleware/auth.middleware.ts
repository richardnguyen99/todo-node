import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        next();
    } catch (_error) {
        res.status(401).send("Unauthorized");
    }
};
