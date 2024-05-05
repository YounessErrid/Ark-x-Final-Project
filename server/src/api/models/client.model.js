const mongoose = require("mongoose");
const User = require("../models/user.model");

var clientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);
clientSchema.pre("findOneAndDelete", async function (next) {
  try {
    const client = await this.model.findOne({ _id: this.getFilter() });
    await User.findByIdAndDelete({ _id: client.userId });
  } catch (error) {
    console.log(error);
  }
  next();
});
module.exports = Client;
