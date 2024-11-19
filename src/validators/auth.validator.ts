import Joi from "joi";

export const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
})