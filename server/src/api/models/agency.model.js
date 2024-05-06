const mongoose = require("mongoose");
const User = require("./user.model");

const agencySchema = new mongoose.Schema({
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
    const agency = await Agency.findOne({ _id: this.getFilter()._id });
    if(agency){
      await User.findByIdAndDelete({ _id: agency.userId });
    }

  } catch (error) {
    console.log(error);
  }
  next();
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
