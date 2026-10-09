const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    isPremium: { type: Boolean, default: false },
    totalExpenses: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// the plugin method is used to apply reusable logic to the database schema.it is built-in Mongoose feature
userSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("User", userSchema);
