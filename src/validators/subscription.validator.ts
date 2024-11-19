import Joi from "joi";

export const createSubscriptionSchema = Joi.object({
  gymId: Joi.string().uuid().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});
