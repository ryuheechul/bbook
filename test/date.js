const assert = require("assert");

const {
  dateFromString,
  nearestFutureDate,
  dateOfToday,
  howFar,
  aDayInMS,
  toYmd
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

  describe("dateFromString", () => {
    it("dateFromString('1984-09-26')", () => {
      const { year, month, date } = toYmd(dateFromString("1984-09-26"));
      assert(year === 1984 && month === 9 && date === 26);
    });

    it("dateFromString('20011-13-50')", () => {
      const { year, month, date } = toYmd(dateFromString("20011-13-50"));
      assert(isNaN(year));
      assert(isNaN(month));
      assert(isNaN(date));
    });
  });
});
