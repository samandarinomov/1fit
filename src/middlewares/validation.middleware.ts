import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ValidationError } from "../utils/errors";

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new ValidationError(error.message));
        }
        next();
    };
};