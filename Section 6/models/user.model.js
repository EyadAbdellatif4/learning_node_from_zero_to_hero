const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: Object,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  phone: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
