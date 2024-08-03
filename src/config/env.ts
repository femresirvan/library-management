import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config({});

const envSchema = Joi.object({
  PORT: Joi.number().min(1).default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  MAX_SCORE: Joi.number().min(1).max(99).default(10),
  MIN_SCORE: Joi.number().min(0).max(98).default(0),
}).unknown(true);

export interface Env {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production';
  MIN_SCORE: number;
  MAX_SCORE: number;
}

const validateEnv = (env: Record<string, unknown>): Env => {
  const { error, value } = envSchema.validate(env, { abortEarly: false });
  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }
  return value;
};

const ENV = validateEnv(process.env);

export default ENV;
