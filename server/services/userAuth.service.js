const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} = require("@getbrevo/brevo");
const { getUserByEmail } = require("./user.service");
const { ForgotPasswordModel } = require("../models/forgotPassword.model");
const { User } = require("../models/user.model");
const { getRequestRecord } = require("./forgotPassword.service");

const createHashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async function (user, password) {
  try {
    const result = await bcrypt.compare(password, user.password);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createJWT = function (user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.fullName,
    phoneNumber: user.phoneNumber,
    isPremium: user.isPremium,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const verifyJWT = function (token) {
  // if the token is valid, return the decoded payload object
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const sendPasswordResetEmail = async function (email) {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const entry = await ForgotPasswordModel.create({ userId: user._id });

    const resetLink = `${process.env.FRONTEND_URL}/pages/reset-password.html?id=${entry.id}`;

    let emailAPI = new TransactionalEmailsApi();
    emailAPI.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY,
    );

    const message = new SendSmtpEmail();
    message.subject = "Reset password Link";
    message.htmlContent = `
    <h3>Below is your reset password link</h3>
    <a href=${resetLink}>Click Here to reset password</a>
  `;
    message.sender = {
      name: "CashVault",
      email: "animeshmohanty.am@gmail.com",
    };
    message.to = [{ email: "mohantyanimesh.96@gmail.com", name: "Recipient" }];

    return await emailAPI.sendTransacEmail(message);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkResetUrlValidity = async function (id) {
  try {
    const record = await getRequestRecord(id);

    return record;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePassword = async function (id, newPassword) {
  try {
    const hashedPassword = await createHashPassword(newPassword);
    const record = await getRequestRecord(id);

    if (!record) {
      throw new Error("Reset record not found");
    }

    // const userId = record.userId;
    await UserModel.updateOne(
      { _id: record.userId },
      { $set: { password: hashedPassword } },
    );

    // the same link can't be used again
    await ForgotPasswordModel.updateOne(
      { _id: record._id },
      { $set: { isActive: false } },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  verifyPassword,
  createHashPassword,
  createJWT,
  verifyJWT,
  sendPasswordResetEmail,
  checkResetUrlValidity,
  updatePassword,
};
