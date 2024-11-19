import Joi from 'joi';

export const sportSchema = Joi.object({
  name: Joi.string().required().min(2),
});

export const sportUpdateSchema = Joi.object({
  name: Joi.string().min(2),
});
