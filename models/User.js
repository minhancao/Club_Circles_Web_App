const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ClubSchemaTest = new Schema({
  id: {
    type: String,
    default: "Default Club ID"
  },
  name: {
    type: String,
    default: "Default Description"
  }
});
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  clubs: [ClubSchemaTest]
});
module.exports = User = mongoose.model("users", UserSchema);
