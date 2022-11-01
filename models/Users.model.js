const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create Users schema */
const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Users = mongoose.model("users", usersSchema);

const findUserByEmail = (email) => {
  return Users.findOne({ email });
};

module.exports = {
  findUserByEmail
};
