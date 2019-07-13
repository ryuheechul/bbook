const ms = 1000;
const hourInSec = 3600;

function toYmd(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  };
}

function ymdToDate(map) {
  const { year, month, date } = map;
  return new Date(year, month - 1, date);
}

function noTime(date) {
  const justDate = toYmd(date);

  return ymdToDate(justDate);
}

function dateOfToday() {
  return noTime(new Date());
}

const aDayInMS = ms * 24 * hourInSec;

function getTimeInDate(date) {
  return date.getTime() / aDayInMS;
}

function howFar(birth, today) {
  return Math.abs(getTimeInDate(birth) - getTimeInDate(today));
}

function dateFromString(dateStr, validate) {
  if (validate) {
    if (!validate(dateStr)) throw new Error("invalid date format");
  }

  return new Date(dateStr);
}

function nearestFutureDateOf(oldDate) {
  return nearestFutureDate({ oldDate, dateToCompare: dateOfToday() });
}

function nearestFutureDate({ oldDate, dateToCompare }) {
  const thisYear = toYmd(dateToCompare).year;

  const thisYearBirthday = ymdToDate({
    ...toYmd(oldDate),
    year: thisYear
  });

  const isPastTheStandard =
    thisYearBirthday.getTime() > dateToCompare.getTime();

  const year = isPastTheStandard ? thisYear : thisYear + 1;

  const nearestDate = ymdToDate({ ...toYmd(oldDate), year });

  return nearestDate;
}

module.exports = {
  dateFromString,
  nearestFutureDateOf,
  nearestFutureDate,
  dateOfToday,
  howFar,
  aDayInMS,
  toYmd
};
