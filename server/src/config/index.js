const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    // NODE_ENV: 'development',
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
console.log(envVars.MONGODB_URL);

module.exports = {
  // env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  videosdk: {
    apiKey: process.env.VIDEOSDK_API_KEY,
    secretKey: process.env.VIDEOSDK_SECRET_KEY,
    apiEndpoint: process.env.VIDEOSDK_API_ENDPOINT,
  },
};
