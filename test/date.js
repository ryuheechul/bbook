const assert = require("assert");

const {
  dateFromString,
  nearestFutureDate,
  dateOfToday,
  howFar,
  aDayInMS
} = require("../src/date");

const today = dateOfToday();
const threeDaysLater = new Date(today.getTime() + aDayInMS * 3);

describe("date module", () => {
  describe("howFar", () => {
    it("howFar(today, threeDaysLater) === 3", () => {
      assert(Math.abs(howFar(today, threeDaysLater)) === 3);
    });

    it("nearestFutureDate", () => {
      assert(!"write here");
    });

    it("dateFromString", () => {
      assert(!"write here");
    });
  });
});
