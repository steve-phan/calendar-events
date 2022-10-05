const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventCalendarSchema = new Schema({
  user: String,
  title: String,
  start: String,
  end: String,
});

module.exports = { eventCalendarSchema };
