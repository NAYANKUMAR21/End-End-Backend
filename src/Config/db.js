require("dotenv").config();

const mongoose = require("mongoose");
const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.DB_URL);
  return;
};

module.exports = connect;
