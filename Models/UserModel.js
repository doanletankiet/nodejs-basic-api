const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,

  role: String,
});

//compiler
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
