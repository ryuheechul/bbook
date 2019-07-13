const { Router } = require("express");
const router = Router();
const {
  howFar,
  dateFromString,
  nearestFutureDateOf,
  dateOfToday
} = require("../date");

const {
  birthday: { set: setBirthday, get: getBirthday },
  validator
} = require("../repo/postgres");

router.get("/", function(req, res, next) {
  res.send("Hello! This is a birthday recording app.");
});

router.put("/hello/:username", async (req, res, next) => {
  const { username } = req.params;
  const { dateOfBirth } = req.body;

  try {
    await setBirthday(username, dateOfBirth);

    //TODO: use below
    // res.status(204);
    res.json({
      un: username,
      db: dateOfBirth,
      test: validator.username(username)
    });
  } catch (error) {
    console.error(error);
    //TODO: proper status code and stuff
    res.json({ not: "valid" });
  }
});

router.get("/hello/:username", async (req, res, next) => {
  const { username } = req.params;
  let birthdayStr;

  try {
    birthdayStr = await getBirthday(username);
  } catch (error) {
    res.status(404).end(`no username nor birthday found of '${username}'`);
    return;
  }

  const birthDate = dateFromString(birthdayStr, validator.bDate);
  const nearestDate = nearestFutureDateOf(birthDate);
  const today = dateOfToday();
  const distance = howFar(nearestDate, today);
  const msg = birthDayMsg(username, distance);

  res.json({ message: msg });
});

function birthDayMsg(username, distance) {
  if (distance > 0) {
    return `Hello, ${username}! Your birth day is in ${distance} day(s)`;
  }

  return `Hello, ${username}! Happy birthday!`;
}

module.exports = router;
