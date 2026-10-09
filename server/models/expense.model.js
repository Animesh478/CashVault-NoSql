const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON");

const expenseSchema = new mongoose.Schema(
  {
    expenseAmount: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// listing + yearly report queries filter by user and sort/filter by date
expenseSchema.index({ userId: 1, createdAt: -1 });

expenseSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("Expense", expenseSchema);
