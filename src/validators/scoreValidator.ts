import Joi from 'joi';
import ENV from '../config/env';

export const scoreValidator = Joi.object({
  score: Joi.number()
    .required()
    .min(ENV.MIN_SCORE)
    .max(ENV.MAX_SCORE)
    .integer()
    .messages({
      'number.base': 'Score must be a number.',
      'number.empty': 'Score is required.',
      'number.min': `Score must be at least ${ENV.MIN_SCORE}.`,
      'number.max': `Score must be at most ${ENV.MAX_SCORE}.`,
      'any.required': 'Score is required.',
      'number.integer': 'Score must be an integer.',
    }),
});
