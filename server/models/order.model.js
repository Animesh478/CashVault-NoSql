const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    currency: { type: String, default: "INR" },
    orderAmount: { type: Number, required: true },
    paymentSessionId: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

orderSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("Order", orderSchema);
