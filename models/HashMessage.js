const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  hash: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
});

module.exports = HashMessage = mongoose.model("hashMessage", UserSchema);
