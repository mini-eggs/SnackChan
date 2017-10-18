import Sequelize from "sequelize";

const { DBNAME, DBUSER, DBPASSWORD, DBHOST } = process.env;

// Create initial database connection
// to initialize models and sync
// with current DB.
const database = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
  host: DBHOST,
  dialect: "mysql"
});

// Models.
const Suggestions = database.define("Suggestions", {
  deviceID: Sequelize.STRING(255),
  content: Sequelize.STRING(4096)
});

// Create models/tables if they do not exist.
database.sync();

export { Suggestions };
