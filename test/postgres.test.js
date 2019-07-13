const assert = require("assert");
const {
  initConn,
  endConn,
  birthday: dbBirthday
} = require("../src/db/postgres");

const { selectRow, insertRow } = dbBirthday;

const { birthday: repoBirthday } = require("../src/repo/postgres");
const { get, set } = repoBirthday;

describe("postgres module testing", () => {
  before(async () => {
    console.log("initiating connection");
    await initConn();
    console.log("initiated connection");
  });

  after(async () => {
    console.log("ending connection");
    await endConn();
    console.log("ended connection");
  });

  describe("db/postgres", () => {
    it("insert and select goodman 1984-09-26", async () => {
      const un = "goodman";
      const bd = "1989-11-06";
      await insertRow(un, bd);
      const { username, bdate } = await selectRow(un);
      assert(username === un);
      assert(bdate === bd);
    });
  });

  describe("repo/postgres", () => {
    it("", async () => {
      const un = "betterman";
      const bd = "1889-11-06";
      await set(un, bd);
      const bdate = await get(un);

      assert(bdate === bd);
    });
  });
});
