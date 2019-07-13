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
      assert(howFar(today, threeDaysLater) === 3);
    });
  });

  describe("nearestFutureDate", () => {
    it("past", () => {
      const sD = new Date(2019, 6, 10);
      const bD = new Date(2000, 5, 7);
      const nfd = nearestFutureDate({ oldDate: bD, dateToCompare: sD });

      assert(nfd.getFullYear() === 2020);
    });

    it("future", () => {
      const sD = new Date(2019, 6, 10);
      const bD = new Date(2000, 8, 7);
      const nfd = nearestFutureDate({ oldDate: bD, dateToCompare: sD });

      assert(nfd.getFullYear() === 2019);
    });
  });

  describe("nearestFutureDate", () => {
    it("dateFromString", () => {
      assert(!"write here");
    });
  });
});
