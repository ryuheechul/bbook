const ms = 1000;
const hourInSec = 3600;

function dateMap(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  };
}

function mapToDate(map) {
  return new Date(map.year, map.month, map.date);
}

function noTime(date) {
  const justDate = dateMap(date);

  return mapToDate(justDate);
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
  // only 'YYYY-MM-DD' format
  if (validate) {
    if (!validate(dateStr)) throw new Error("invalid date format");
  }

  return new Date(dateStr);
}

function nearestFutureDateOf(oldDate) {
  return nearestFutureDate({ oldDate, dateToCompare: dateOfToday() });
}

function nearestFutureDate({ oldDate, dateToCompare }) {
  const thisYear = dateMap(dateToCompare).year;

  const thisYearBirthday = mapToDate({
    ...dateMap(oldDate),
    year: thisYear
  });

  const isPastTheStandard =
    thisYearBirthday.getTime() > dateToCompare.getTime();

  const year = isPastTheStandard ? thisYear : thisYear + 1;

  const nearestDate = mapToDate({ ...dateMap(oldDate), year });

  return nearestDate;
}

module.exports = {
  dateFromString,
  nearestFutureDateOf,
  nearestFutureDate,
  dateOfToday,
  howFar,
  aDayInMS
};
