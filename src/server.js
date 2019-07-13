const app = require("./app");

const { initConn, endConn } = require("./db/postgres");

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
