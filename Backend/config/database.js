const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => {
      console.log("DB connection is successfully.");
    })
    .catch((error) => {
      console.log("Issue in DB connection.");
      console.error(error);
      process.exit(1);
    });
};

module.exports = dbConnect;
