const bcrypt = require("bcrypt");
const Client = require("../models/client.model");
const User = require("../models/user.model");

const register = async (req, res) => {
  const { email, password, fullname, phone } = req.body;
  let path = req.file ? req.file.path : null; // Check if req.file exists before accessing path
  try {
    if (!email || !password || !fullname || !phone) {
      return res.status(400).json({
        error: "User creation failed: Missing required information!",
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
    });
    
    if (path) {
      user.profile_image = path;
    }

    const data = await user.save();

    const client = new Client({ userId: data.id, phone: phone });
    const cliData = await client.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: data,
      client: cliData,
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

const create = async (req, res) => {
  const { email, password, fullname, phone } = req.body;

  try {
    if (!email || !password || !fullname || !phone) {
      return res.status(400).json({
        error: "Client creation failed: Missing required information!",
      });
    }

    const newClient = new Client({ email, password, fullname, phone });
    await newClient.save();

    res.status(201).json({
      success: true,
      message: "Client created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error creating client: ${error.message}` },
      ]);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(404).json({ error: "Client not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error finding client: ${error.message}` },
      ]);
  }
};

const viewAll = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length > 0) {
      return res.status(200).json(clients);
    } else {
      return res.status(404).json({ error: "No clients found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error retrieving clients: ${error.message}` },
      ]);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdAt, email, ...newClientData } = req.body; // Exclude createdAt from newPostData

    if (!id || !newClientData) {
      return res
        .status(400)
        .json({ error: "Client update failed: Missing required fields!" });
    }

    // Update the client with the given ID
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        ...newClientData,
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found!" });
    }

    return res.status(200).json(updatedClient);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating client: ${error.message}` },
      ]);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Client deletion failed: Missing required information!",
      });
    }

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
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
  create,
  findOne,
  viewAll,
  update,
  remove,
};
