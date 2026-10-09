const { User } = require("../models/user.model");

const addUser = async function ({ name, email, password, phoneNumber }) {
  try {
    const user = await User.create({
      fullName: name,
      email,
      password,
      phoneNumber,
    });
    return user.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserByEmail = async function (email) {
  try {
    return await User.findOne({ email: String(email).toLowerCase() });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserData = async function (email) {
  try {
    return await getUserByEmail(email);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTotalExpenses = async function (expenseAmount, userId) {
  try {
    // $inc is atomic on a single document, so no transaction is needed
    await User.updateOne(
      { _id: userId },
      { $inc: { totalExpenses: Number(expenseAmount) } },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  updateTotalExpenses,
  getUserData,
};
