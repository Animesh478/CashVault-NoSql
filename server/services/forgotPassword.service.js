const { ForgotPasswordModel } = require("../models/forgotPassword.model");

const getRequestRecord = async function (id) {
  try {
    // a malformed id from the URL should behave like "not found", not a 500
    if (!mongoose.isValidObjectId(id)) return null;
    return await ForgotPasswordModel.findById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getRequestRecord,
};
