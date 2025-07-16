const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const inquiry = new mongoose.Schema(
  {
    fullName: { type: String, required: true, default: null },
    email: { type: String, required: true, default: null },
    contactNumber: { type: String, required: true, default: null },
    subject: { type: String, required: true, default: null },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

inquiry.plugin(AutoIncrement, { inc_field: "inquiry_Id" });

module.exports = mongoose.model("Inquiry", inquiry);
