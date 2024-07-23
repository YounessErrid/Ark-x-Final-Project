const Portfolioservice = require("../models/portfolioServices.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    user: {
      role: req.user.role,
      fullname: req.user.fullname,
    },
  });
};

const register = async (req, res) => {
  const { email, password, fullname, role } = req.body;
  try {
    if (!email || !password || !fullname) {
      return res.status(400).json({
        error: "Client creation failed: Missing required information!",
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
      role: role,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
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

const destroy = async (req, res, next) => {
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
        { message: `Error deleting Client: ${error.message}` },
      ]);
  }
};

const addLike = async (req, res) =>{
  const {userId, portfolioServiceId} = req.params;

  try {
    const user = await User.findById(userId)
    
    if(!user){
      return res.status(401).json({erorr: "User not found"})
    }

    const portfolioService = await Portfolioservice.findById(portfolioServiceId)

    if(!portfolioService){
      return res.status(401).json({erorr: "PortfolioService not found"})
    }

    portfolioService.likes.push(userId)

    await portfolioService.save()

    res.json({message: "Like added successfully"})
  } catch (error) {
    return res
    .status(500)
    .json([
      { error: "Internal server error" },
      { message: `Error deleting Client: ${error.message}` },
    ]);
  }
}

const removeLike = async (req, res) =>{
  const {userId, portfolioServiceId} = req.params;

  try {
    const user = await User.findById(userId)
    
    if(!user){
      return res.status(401).json({erorr: "User not found"})
    }

    const portfolioService = await Portfolioservice.findById(portfolioServiceId)

    if(!portfolioService){
      return res.status(401).json({erorr: "PortfolioService not found"})
    }

    portfolioService.likes.filter(like => like !== userId)

    await portfolioService.save()

    res.json({message: "Like added successfully"})
  } catch (error) {
    return res
    .status(500)
    .json([
      { error: "Internal server error" },
      { message: `Error deleting Client: ${error.message}` },
    ]);
  }
}


module.exports = {
  login,
  register,
  destroy,
  findOne,
  viewAll,
  update,
  remove,
  addLike,
  removeLike
};
