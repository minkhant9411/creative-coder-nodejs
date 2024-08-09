const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { Type: String, require: true },
  password: { Type: String, require: true },
});

const User = mongoose.model("User", UserSchema);
mongoose.exports = User;
