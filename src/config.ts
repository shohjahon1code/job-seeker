import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(8000),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_URI: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
});

export const configuration = () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  database: {
    uri: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export default {
  isGlobal: true,
  load: [configuration],
  validationSchema: validationSchema,
  validationOptions: {
    abortEarly: true,
  },
};
