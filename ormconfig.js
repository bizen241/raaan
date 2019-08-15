// @ts-check

/**
 * @type {import("typeorm").ConnectionOptions}
 */
const connectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

module.exports = connectionOptions;
