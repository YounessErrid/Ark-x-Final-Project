const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const sendEmail = require("../helpers/email");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, password, fullname } = req.body;
  const path = req.file.path;
  try {
    if (!email || !password || !fullname) {
      return res.status(400).json({
        error: "Admin creation failed: Missing required information!",
      });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email: email,
      password: hashedPassword,
      fullname: fullname,
      profile_image: path,
      role: "admin",
    });

    const userData = await user.save();

    const admin = new Admin({ userId: userData.id });
    const adminData = await admin.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
      admin: adminData,
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error creating User: ${error.message}` },
      ]);
  }
};

const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    user: {
      role: req.user.role,
      fullname: req.user.fullname,
      profile: req.user.profile_image,
    },
  });
};
const destroy = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  });
};
const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "Can't find this email" });
  }
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;
  const message = `Click the following link to reset your password:\n\n ${resetUrl} \n\n`;
  console.log(message);
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password change request received",
      message: message,
    });
    res.status(200).json({
      success: "true",
      message: "Password reset link sent to the user email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        message: "Token is Invalid or Expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    // Reset token and expiration
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password successfully reset",
      // Ensure req.user is properly set up in your middleware or previous routes
      user: {
        role: req.user ? req.user.role : user.role,
        fullname: req.user ? req.user.fullname : user.fullname,
        profile: req.user ? req.user.profile_image : user.profile_image,
      },
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  register,
  login,
  destroy,
  forgotPassword,
  resetPassword,
};
