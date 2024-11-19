import Joi from 'joi';

export const gymSchema = Joi.object({
  name: Joi.string().required().min(2),
  address: Joi.string().required().min(5),
});

export const gymUpdateSchema = Joi.object({
  name: Joi.string().min(2),
  address: Joi.string().min(5),
});
