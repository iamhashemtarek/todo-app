const http = require("http");
const dotenv = require("dotenv").config({ path: "./config.env" });
const db = require("./db");
const routesHandler = require("./routesHandler");

const server = http.createServer(routesHandler);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

db.connect((err) => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    server.listen(PORT, HOST, () => {
      console.log(`connected to database, server is listening on port ${PORT}`);
    });
  }
});

