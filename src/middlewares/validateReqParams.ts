import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const dynamicSchema = Joi.object().pattern(
  Joi.string(), // Anahtarlar string olmalıdır
  Joi.number().integer().required(), // Değerler integer olmalıdır
);

export const validateReqParams = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = dynamicSchema.validate(req.params);

    if (error) {
      return res.status(400).json({
        error: error.details.map((detail) => detail.message).join(', '),
      });
    }

    next();
  };
};
