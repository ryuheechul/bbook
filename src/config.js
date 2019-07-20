function postgres() {
  switch (process.env.NODE_ENV) {
    case "production":
      return {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT || 5432
      };
    case "test":
      return { host: "postgres", port: 5432 };
    case "development":
    default:
      return { host: "postgres", port: 5432 };
  }
}

module.exports = { postgres: postgres() };
