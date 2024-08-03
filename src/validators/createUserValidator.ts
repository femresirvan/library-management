import Joi from 'joi';

export const createUserValidator = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 100 characters long',
  }),
});
