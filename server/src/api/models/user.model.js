const mongoose = require("mongoose");
var User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["admin", "user", "agency"],
    },
  },
);



const User = mongoose.model("User", userSchema);
module.exports = User











// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     role: {
//       type: String,
//       required: true,
//       trim: true,
//       enum: ["admin", "user", "agency"],
//     },
//   },
//   { timestamps: true }
// );

