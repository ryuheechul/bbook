const {
  birthday: { selectRow, insertRow }
} = require("../db/postgres");

const validator = {
  bDate: dateString => {
    // filter wrong format first
    if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(dateString)) return false;

    // validate date using new Date()
    const date = new Date(dateString);

    if (isNaN(date)) return false;

    return true;
    // TODO: check if date is future than today.
    // need to extract date related functions as module first
  },
  username: uname => {
    return /^[a-zA-Z]+$/.test(uname);
  }
};

function validate(username, bDate) {
  const { username: un, bDate: bd } = validator;

  if (!un(username)) return [false, "username is not valid"];
  if (!bd(bDate)) return [false, "bDate is not valid"];

  return [true, "everything is valid"];
}

const handleBirthday = {
  set: async (username, bDate) => {
    const [isValid, reason] = validate(username, bDate);

    if (!isValid) {
      throw new Error(reason);
    }

    await insertRow(username, bDate); // no error throws when success
    // no return values
  },
  get: async username => {
    const { username: un, bdate: bDate } = await selectRow(username);

    if (username !== un) {
      throw new Error("wrong data");
    }
    return bDate;
  }
};

module.exports = { birthday: handleBirthday, validator };
