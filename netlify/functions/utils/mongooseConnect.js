const mongoose = require("mongoose");
require("dotenv").config();
/**
 * @type { mongoose.Mongoose } conn
 */

let conn = null;

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async function () {
  if (conn == null) {
    conn = await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
  }
  return conn;
};

module.exports = { connect };
