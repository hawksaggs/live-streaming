// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const mongoUtil = require('../utils/mongoUtil');

// const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }

//   if (user.isDeleted) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, "User profile doesn't exists"));
//   }

//   const tokenPayload = jwt.decode(req.get('Authorization').split(' ')[1]);

//   req.user = user.toObject({ getters: true });

//   if (tokenPayload.par) req.user.parent = mongoUtil.convertToObjectId(tokenPayload.par);

//   resolve();
// };

// const auth = async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

const jwt = require("../utils/jwt");

const ignoreRoutes = [
  "POST:/api/v1/auth/login",
  "POST:/api/v1/auth/register",
  "GET:/api/v1/events",
  // "GET:/api/v1/event",
  "GET:/api/v1/meeting/token",
  "GET:/api/v1/event/public",
];

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (ignoreRoutes.some((r) => `${req.method}:${req.path}`.match(r)))
    return next();
  // if (ignoreRoutes.includes(`${req.method}:${req.path}`)) return next();
  if (!authorization) return next(new Error("Invalid header"));
  const authorizationHeader = authorization.split(" ");
  if (authorizationHeader < 2) {
    next(new Error("Invalid header"));
  }
  const token = authorizationHeader[1];
  if (!token) return next(new Error("Token required"));
  try {
    await jwt.verifyToken(req, token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkToken,
};
