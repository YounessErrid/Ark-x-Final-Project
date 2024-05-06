const mongoose = require("mongoose");
const User = require("./user.model");

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    permission: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("findOneAndDelete", async function (next) {
  try {
    console.log('this.getFilter()._id', this.getFilter()._id);
    // find admin
    const admin = await Admin.findOne({ _id: this.getFilter()._id });
    
      await User.findByIdAndDelete({ _id: admin.userId });

  } catch (error) {
    console.log(error);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

