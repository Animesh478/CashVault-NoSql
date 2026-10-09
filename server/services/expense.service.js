const mongoose = require("mongoose");
const { ExpenseModel } = require("../models/expense.model");

const getUserExpenses = async function (options) {
  const userId = options.user.userId;
  const rawPage = Number(options.pagination.page);
  const page = isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = options.pagination.limit * 1;
  const sortDirection = options.sorting.order === "ASC" ? 1 : -1;

  try {
    const docs = await ExpenseModel.find({ userId })
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit + 1);
    return docs.map((doc) => doc.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllExpenses = async function (userId) {
  try {
    const docs = await ExpenseModel.find({ userId });
    return docs.map((doc) => doc.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCurrentYearExpenses = async function (userId) {
  const currentYear = new Date().getFullYear();
  try {
    return await ExpenseModel.find({
      userId,
      createdAt: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createUserExpense = async function (
  expenseAmount,
  description,
  category,
  user,
) {
  try {
    const newExpense = await ExpenseModel.create({
      expenseAmount: Number(expenseAmount),
      description,
      category,
      userId: user.id,
    });
    return newExpense.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteExpenseFromDB = async function (expenseId, userId) {
  try {
    if (!mongoose.isValidObjectId(expenseId)) return 0;
    const { deletedCount } = await ExpenseModel.deleteOne({
      _id: expenseId,
      userId,
    });
    return deletedCount;
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

module.exports = {
  getUserExpenses,
  createUserExpense,
  deleteExpenseFromDB,
  getCurrentYearExpenses,
  getAllExpenses,
};
