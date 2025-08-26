const { Sequelize } = require("sequelize");
require("dotenv").config();

const useUrl = !!process.env.DATABASE_URL;

const sequelize = useUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: process.env.PGSSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
    })
  : new Sequelize(
      process.env.PGDATABASE,
      process.env.PGUSER,
      process.env.PGPASSWORD,
      {
        host: process.env.PGHOST || "localhost",
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        dialect: "postgres",
        logging: false,
        dialectOptions: process.env.PGSSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
      }
    );

module.exports = { sequelize };


