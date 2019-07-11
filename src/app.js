const createError = require("http-errors");
const express = require("express");
const indexRouter = require("./routes/index");

const app = express();

const { initConn, endConn } = require("./db/postgres");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

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

//test();
initConn();
//TODO: delete www and bring the control here, add endConn()

const port = process.env.PORT || "3000";

//app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(port, () =>
  console.log(`app listening on port ${port}!`)
);

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  endConn(); // end database connection
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
}
