const bcrypt = require("bcrypt");
const Agency = require("../models/agency.model");
const User = require("../models/user.model");

const register = async (req, res) => {
  const { email, password, fullname, addresse } = req.body;
  const path = req.file.path;
  try {
    if (!email || !password || !fullname || !addresse) {
      return res.status(400).json({
        error: "Agency creation failed: Missing required information!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email: email,
      password: hashedPassword,
      fullname: fullname,
      profile_image: path,
      role: "agency",
    });

    const userData = await user.save();

    const agency = new Agency({ userId: userData.id, addresse: addresse });
    const agencyData = await agency.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
      agency: agencyData,
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


module.exports = {
  register,
  login,
  destroy,
};
