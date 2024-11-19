import Joi from 'joi';

export const linkSportGymSchema = Joi.object({
  sportId: Joi.string().uuid().required(),
  gymId: Joi.string().uuid().required(),
});
