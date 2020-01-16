// @ts-check

/**
 * @type {import("typeorm").ConnectionOptions}
 */
const connectionOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ["out/server/database/migrations/*.js"],
  cli: {
    migrationsDir: "src/server/database/migrations"
  }
};

module.exports = connectionOptions;
