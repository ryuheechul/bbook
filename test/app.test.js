const assert = require("assert");
const request = require("supertest");
const { initConn, endConn } = require("../src/db/postgres");

const app = require("../src/app");
const { speak: birthDayMsg } = require("../src/message");

describe("postgres module testing", () => {
  let server;
  const port = 3333;

  before(async () => {
    console.log("initiating db connection");
    await initConn();
    console.log("initiated db connection");

    console.log("starting server");
    server = app.listen(port, () => {
      console.log("server started");
    });
  });

  after(async () => {
    console.log("closing server");
    server.close(async () => {
      console.log("server closed");

      console.log("ending db connection");
      await endConn();
      console.log("ended db connection");
    });
  });

  describe("http", () => {
    it("GET /", done => {
      request(server)
        .get("/")
        .expect(200, done);
    });

    const bd = "1989-11-06";
    const un = "goodmanhttp";

    it("PUT /hello/goodmanhttp", done => {
      request(server)
        .put(`/hello/${un}`)
        .send({ username: un, dateOfBirth: bd })
        .expect(204, done);
    });

    it("PUT /hello/goodmanhttp wrong birthday format", done => {
      const bd = "1989-101-060";

      request(server)
        .put(`/hello/${un}`)
        .send({ username: un, dateOfBirth: bd })
        .expect(500, done);
    });

    it("PUT /hello/goodmanhttp wrong username format", done => {
      const un = "goodman9120http";

      request(server)
        .put(`/hello/${un}`)
        .send({ username: un, dateOfBirth: bd })
        .expect(500, done);
    });

    it("GET /hello/goodmanhttp", done => {
      //TODO: deal with dynamic distance issue
      //const distance = 3;
      //const message = birthDayMsg(un, distance);

      request(server)
        .get(`/hello/${un}`)
        //.expect(200, { message }, done);
        .expect(200, done);
    });
  });
});
