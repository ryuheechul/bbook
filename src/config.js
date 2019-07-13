function postgres() {
  switch (process.env.NODE_ENV) {
    case "production":
      return {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT
      };
    case "test":
      return { host: "localhost", port: 55432 };
    case "development":
    default:
      return { host: "localhost", port: 5432 };
  }
}

module.exports = { postgres: postgres() };
