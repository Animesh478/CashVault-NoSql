const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON");

const forgotPasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

forgotPasswordSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
