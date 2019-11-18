var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var schedule = require("node-schedule");
var cors = require("cors");
var whitelist = ["http://localhost:3001", "http://example2.com"];

var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

console.log("always run first");
//auto register to service registry. Every 30s
const registerService = () =>
  axios
    .put(`http://localhost:3003/register/users/1.0/3002`)
    .then(r => {
      console.log("register to registry service sucess");
    })
    .catch(e => {
      console.log("register service error", e);
    });
const unregisterService = () =>
  axios
    .delete(`http://localhost:3003/register/users/1.0/3002`)
    .then(r => {
      console.log("delete to registry service sucess");
    })
    .catch(e => {
      console.log("delete service error", e);
    });
// auto regisgter when start app
registerService();
// refresh the register every 30'
schedule.scheduleJob("*/30 * * * * *", function() {
  registerService();
});

//clean up
const cleanup = async () => {
  await unregisterService();
};
process.on("uncaughtException", async () => {
  await cleanup();
});
// test unregister
// setTimeout(()=>{
//   throw new Error('something happen!');
// },10000)
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
  res.render("error");
});

module.exports = app;
