var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var schedule = require("node-schedule");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
console.log("always run first");
//auto register to service registry.
const registerService = () =>
  axios
    .put(`http://localhost:3003/register/posts/1.0/192.168.43.230/3001`)
    .then(r => {
      console.log("register success");
    });
const unregisterService = () =>
  axios.delete(`http://localhost:3003/register/posts/1.0/3001`);

registerService();
const interval = setInterval(registerService, 30000); // refresh registry after 30'
//clean up
const cleanup = async () => {
  clearInterval(interval);
  await unregisterService();
};
process.on("uncaughtException", async () => {
  await cleanup();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.stack);
});

module.exports = app;
