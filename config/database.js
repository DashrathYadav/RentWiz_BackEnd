const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const { exec } = require("child_process");

const { database, username, password, host, dialect } = config;

let sequelize = new Sequelize({ username, password, host, dialect });

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(database, username, password, config);
}
// sequelize.authenticate().then(() => {
// 	console.log('Connection has been established Successfully.');
// 	const db = require("../models");
// }).catch((error) => {
// 	console.error('Unable to connect to the database: ', error);
// });
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    const db = require("../models");
    db.sequelize
      .sync()
      .then(() => {
        console.log("Synced db.");
        // Logic for Sync all Migration scripts
        const migrationProcess = exec("npx sequelize-cli db:migrate");
        migrationProcess.stdout.on("data", (data) => {
          console.log(data);
        });
        migrationProcess.stderr.on("data", (data) => {
          console.error(data);
        });
        migrationProcess.on("close", (code) => {
          if (code === 0) {
            //sequelize.query(`USE ${database}`);
            console.log("Migrations executed successfully.");
          } else {
            console.error("Migrations failed with exit code " + code);
          }
        });
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
