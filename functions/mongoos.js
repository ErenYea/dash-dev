const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  paymentid: String,
  apikey: String,
  macaddress: String,
});

module.exports = mongoose.model("users", UserSchema);
