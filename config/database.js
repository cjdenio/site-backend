const parse = require("pg-connection-string").parse;

if (process.env.NODE_ENV == "production") {
  const config = parse(process.env.DATABASE_URL);

  module.exports = ({ env }) => ({
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.user,
          password: config.password,
        },
        options: {
          ssl: false,
        },
      },
    },
  });
} else {
  module.exports = ({ env }) => ({
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "sqlite",
          filename: env("DATABASE_FILENAME", ".tmp/data.db"),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  });
}
