const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const httpStatus = require("http-status");
const cors = require("cors");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const path = require("path");
const auth = require("./middlewares/auth");

const app = express();

//set static route
app.use("/api/static", express.static(path.resolve("public")));

const corsOptions = {
  origin: "*",
};

//set cors
app.use(cors(corsOptions));
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(
  express.json({
    limit: "50mb",
  })
);

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(auth.checkToken);

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
