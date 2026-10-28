require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");
require("./models");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Healthcare API is running on port ${port}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
