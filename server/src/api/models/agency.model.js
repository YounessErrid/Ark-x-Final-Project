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
  hasAccess: {
    type: Boolean,
    required : true,
    default: false
  }
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

// Agency.js


const Agency = mongoose.model("Agency", agencySchema);

Agency.schema.index({ agencyName: 'text', addresse: 'text' });  // Text index for searching

module.exports = Agency;
