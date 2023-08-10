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

// module.exports = auth;
