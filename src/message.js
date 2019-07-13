function speak(username, distance) {
  if (distance > 0) {
    return `Hello, ${username}! Your birth day is in ${distance} day(s)`;
  }

  return `Hello, ${username}! Happy birthday!`;
}

module.exports = { speak };
