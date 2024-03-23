const Client = require("../../models/client.model");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
  });
};

const register = async (req, res) => {
  const { email, password, fullname, phone } = req.body;
  try {
    if (!email || !password || !fullname || !phone) {
      return res
        .status(400)
        .json({
          error: "Client creation failed: Missing required information!",
        });
    }

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const client = new Client({
      email: email,
      password: hashedPassword,
      fullname: fullname,
      phone: phone,
    });

    await client.save();
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

const destroy = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({
            success: true,
            message: 'Successfully logged out'
        })
      });
}

module.exports = {
  login,
  register,
  destroy,
};
