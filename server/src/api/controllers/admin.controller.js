const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const sendEmail = require("../helpers/email");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const path = req.file ? req.file.path : null;
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
const createAdmin = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    if (!email || !password || !fullname) {
      return res.status(400).json({
        error: "Admin creation failed: Missing required information!",
      });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email: email,
      password: hashedPassword,
      fullname: fullname,
      role: "admin",
    });

    const userData = await user.save();

    const admin = new Admin({ userId: userData.id });
    const adminData = await admin.save();
    const data = {
      _id: admin._id,
      userId: admin.userId._id,
      fullname: admin.userId.fullname,
      email: admin.userId.email,
      role: admin.userId.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: data
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error creating Admin: ${error.message}` },
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
const forgotPassword = async (req, res) => {
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
const resetPassword = async (req, res) => {
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
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error reseting password: ${error.message}` },
      ]);
  }
};
const checkSession = (req, res) => {
  const user = req.user;
  try {
    if (user) {
      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        user: {
          role: req.user.role,
          fullname: req.user.fullname,
          profile: req.user.profile_image,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error verifying user session: ${error.message}` },
      ]);
  }
};
const viewAll = async (req, res) => {
  try {
    const admins = await Admin.find({ userId: { $ne: null } })
      .populate({
        path: "userId",
        match: { role: "admin" },
        select: "fullname profile_image email role",
      })
      .exec();

    if (admins.length === 0) {
      return res.status(404).json({ error: "No admins found" });
    }
    const filteredAdmins = admins.filter((admin) => admin.userId);
    const responseData = filteredAdmins.map((admin) => ({
      _id: admin._id,
      userId: admin.userId._id,
      fullname: admin.userId.fullname,
      email: admin.userId.email,
      role: admin.userId.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }));
    // Construct the response object with the desired fields
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error retrieving admins: ${error.message}`,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Admin deletion failed: Missing required information!",
      });
    }

    const deletedAdmin = await Admin.findOneAndDelete({ _id: id });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: deletedAdmin,
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error deleting agency: ${error.message}` },
      ]);
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {role, createdAt,userId, _id, ...newAdminData } = req.body; // Exclude createdAt from newPostData

    if (!id || !newAdminData) {
      return res
        .status(400)
        .json({ error: "Admin update failed: Missing required fields!" });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    if(newAdminData.password){
      
      // const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(newAdminData.password, 10);
      newAdminData.password = hashedPassword;
    // const hashedPassword = bcrypt.hashSync(password, salt);
    }
    // Update the client with the given ID
    const updatedAdmin = await User.findByIdAndUpdate(
      admin.userId,
      {
        ...newAdminData,
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found!" });
    }

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating admin: ${error.message}` },
      ]);
  }
};
module.exports = {
  register,
  createAdmin,
  viewAll,
  remove,
  update,
  login,
  destroy,
  forgotPassword,
  resetPassword,
  checkSession,
};

// const viewAll = async (req, res) => {
//   try {
//     const admins = await Admin.find({ userId: { $ne: null } })
//   .populate({
//     path: "userId",
//     match: { role: "admin" },
//     select: "fullname profile_image email role"
//   })
//   .exec();

//     if (admins.length === 0) {
//       return res.status(404).json({ error: "No admins found" });
//     }
//     const filteredAdmins = admins.filter(admin => admin.userId);
//     const responseData = filteredAdmins.map(admin => ({
//       _id: admin.userId._id,
//       admin_id: admin._id,
//       fullname: admin.userId.fullname,
//       email: admin.userId.email,
//       role: admin.userId.role,
//       createdAt: admin.createdAt,
//       updatedAt: admin.updatedAt
//     }));
//     // Construct the response object with the desired fields
//     return res.status(200).json(responseData);
//   } catch (error) {
//     return res.status(500).json({
//       error: "Internal server error",
//       message: `Error retrieving admins: ${error.message}`,
//     });
//   }
// };
