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

// const create = async (req, res) => {
//   const { email, password, fullname, phone } = req.body;

//   try {
//     if (!email || !password || !fullname || !phone) {
//       return res.status(400).json({
//         error: "Agency creation failed: Missing required information!",
//       });
//     }

//     const newAgency = new Agency({ email, password, fullname, phone });
//     await newAgency.save();

//     res.status(201).json({
//       success: true,
//       message: "Agency created successfully",
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json([
//         { error: "Internal server error" },
//         { message: `Error creating Agency: ${error.message}` },
//       ]);
//   }
// };

// const findOne = async (req, res) => {
//   const { id } = req.params;

  try {
    const Agency = await Agency.findById(id);

    if (Agency) {
      return res.status(200).json(Agency);
    } else {
      return res.status(404).json({ error: "Agency not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error finding Agency: ${error.message}` },
      ]);
  }
};

const viewAll = async (req, res) => {
  try {
    const Agencys = await Agency.find();

    if (Agencys.length > 0) {
      return res.status(200).json(Agencys);
    } else {
      return res.status(404)
      .json({ error: "No Agencys found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error retrieving Agencys: ${error.message}` },
      ]);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdAt, email, ...newAgencyData } = req.body; // Exclude createdAt from newPostData

    if (!id || !newAgencyData) {
      return res
        .status(400)
        .json({ error: "Agency update failed: Missing required fields!" });
    }

    // Update the Agency with the given ID
    const updatedAgency = await Agency.findByIdAndUpdate(
      id,
      {
        ...newAgencyData,
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!updatedAgency) {
      return res.status(404).json({ error: "Agency not found!" });
    }

    return res.status(200).json(updatedAgency);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating Agency: ${error.message}` },
      ]);
  }
};

// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Agency deletion failed: Missing required information!",
      });
    }

    const deletedAgency = await Agency.findByIdAndDelete(id);

    if (!deletedAgency) {
      return res.status(404).json({ error: "Agency not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Agency deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error deleting Agency: ${error.message}` },
      ]);
  }
};

module.exports = {
  register,
  login,
  destroy,
  // create,
  findOne,
  viewAll,
  update,
  remove,
};
