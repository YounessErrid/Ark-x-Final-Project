const bcrypt = require("bcrypt");
const Agency = require("../models/agency.model");
const User = require("../models/user.model");

const register = async (req, res) => {
  const { email, password, fullname, addresse , agencyName} = req.body;
  try {
    const path = req.file ? req.file.path : null;
    if (!email || !password || !fullname || !addresse || !agencyName) {
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

    const agency = new Agency({ userId: userData.id, addresse, agencyName });
    const agencyData = await agency.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {...userData,agencyData }
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
    user : {role: req.user.role , fullname: req.user.fullname},
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

const viewAll = async (req, res) => {
  try {
    const agencies = await Agency.find().populate('userId', ' fullname email');

    if (agencies.length === 0) {
      return res.status(404).json({ error: "No agencies found" });
    }
    // Construct the response object with the desired fields
    const responseData = agencies.map(agency => {
      
      return ({
      
      
      _id:agency._id,
      fullname: agency.userId === null ? null : agency.userId.fullname,
      email: agency.userId === null ? null : agency.userId.email,
      agencyName: agency.agencyName,
      address: agency.addresse // Corrected typo
    })});
    return res.status(200).json(responseData);
    
  } catch (error) {
    return res.status(500).json({ 
      error: "Internal server error",
      message: `Error retrieving agencies: ${error.message}` 
    });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Agency deletion failed: Missing required information!",
      });
    }

    const deletedAgency = await Agency.findOneAndDelete({ _id: id });

    if (!deletedAgency) {
      return res.status(404).json({ error: "Agency not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Agency deleted successfully",
      data: deletedAgency
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


module.exports = {
  register,
  login,
  destroy,
  viewAll,
  remove
};
