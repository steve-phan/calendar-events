const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventCalendarSchema = new Schema({
  user: String,
  title: String,
  time: String,
  date: String,
});

module.exports = { eventCalendarSchema };
