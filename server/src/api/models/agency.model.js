const mongoose = require("mongoose");
const User = require("./user.model");

var agencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addresse: {
    type: String,
    required: true,
    trim: true,
  },
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

agencySchema.pre("findOneAndDelete", async function (next) {
  try {
    const agency = await this.model.findOne({ _id: this.getFilter() });
    await User.findByIdAndDelete({ _id: agency.userId });
  } catch (error) {
    console.log(error);
  }
  next();
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
