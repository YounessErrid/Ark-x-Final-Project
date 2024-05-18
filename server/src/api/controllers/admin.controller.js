const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const sendEmail = require("../helpers/email");
const crypto = require("crypto");
const fs = require("fs");

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
      data: data,
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
      id: req.user._id,
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
  try {
    const frontendHost = req.headers["x-frontend-host"];
    if (!frontendHost) {
      return res.status(400).json({ message: "Frontend host not provided" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${frontendHost}/resetPassword/${resetToken}`;
    const message = `Click the following link to reset your password:\n\n ${resetUrl} \n\n`;

    console.log(message);

    await sendEmail({
      email: req.body.email,
      subject: "Password change request received",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to the user email",
    });
  } catch (error) {
    // Cleanup after error
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    console.log(req.params.token);
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        message: "Token is Invalid or Expired",
      });
    }
    console.log("password", req.body.password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    user.password = hashedPassword;

    // Reset token and expiration
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password successfully reset",
      // Ensure req.user is properly set up in your middleware or previous routes
      // user: {
      //   role: req.user ? req.user.role : user.role,
      //   fullname: req.user ? req.user.fullname : user.fullname,
      //   profile: req.user ? req.user.profile_image : user.profile_image,
      // },
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
          id: req.user._id,
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
    const { ...newAdminData } = req.body; // Exclude createdAt from newPostData
    const path = req.file || null;
    // newAdminData.profile_image = path;

    if (!id || !newAdminData) {
      return res
        .status(400)
        .json({ error: "Admin update failed: Missing required fields!" });
    }

    // const admin = await Admin.findById(id);
    // if (!admin) {
    //   return res.status(404).json({ error: "Admin not found!" });
    // }
    const user = await User.findById(id);
    if (user.profile_image && path !== null) {
      fs.unlink(user.profile_image, (err) => {
        if (err) {
          console.error("Error deleting previous image:", err);
        } else {
          console.log("Previous image deleted successfully");
        }
      });
      user.profile_image = path.path;
    }
    if (newAdminData.fullname) {
      user.fullname = newAdminData.fullname;
    }
    const updatedAdmin = await user.save();

    if (!updatedAdmin) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(202).json({
      success: true,
      message: "Admin successfully updated",
      user: {
        id: user._id,
        role: user.role,
        fullname: user.fullname,
        profile: user.profile_image,
      },
    });

    // return res.status(200).json(updatedAdmin);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating admin: ${error.message}` },
      ]);
  }
};
const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Change password failed: Missing required fields!" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect!" });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update the password in the database
    user.password = hashedPassword;
    await user.save();
    res.status(202).json({
      success: true,
      message: "Admin successfully updated",
      user: {
        id: user._id,
        role: user.role,
        fullname: user.fullname,
        profile: user.profile_image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
  changePassword,
};
