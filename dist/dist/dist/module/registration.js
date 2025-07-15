const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const registration = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  confirmPassword: {
    type: String,
    default: null
  },
  contactNumber: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});
registration.plugin(AutoIncrement, {
  inc_field: "regId"
});
registration.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
registration.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Registration", registration);