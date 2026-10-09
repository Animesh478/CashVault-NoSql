const { UserModel } = require("../models/user.model");

const getUserAndAggregateExpense = async function () {
  try {
    const users = await UserModel.find({}, "fullName totalExpenses").sort({
      totalExpenses: -1,
    });

    return users.map((user) => ({
      id: user.id,
      full_name: user.fullName,
      totalExpenses: user.totalExpenses,
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getUserAndAggregateExpense,
};
