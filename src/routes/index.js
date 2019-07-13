const { Router } = require("express");
const router = Router();
const { speak: birthDayMsg } = require("../message");
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

    res.status(204).end();
  } catch (error) {
    // console.error(error); comment for now to avoid confusion in test console
    res.status(500).send("Not valid");
  }
});

router.get("/hello/:username", async (req, res, next) => {
  const { username } = req.params;
  let birthdayStr;
  //TODO: seperate this logic into another module so testing should be easier

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

module.exports = router;
