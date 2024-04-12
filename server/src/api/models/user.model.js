const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
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
      enum: ["admin", "client", "agency"],
      default : 'client',
    },
  },
);



// const User = mongoose.model("User", user);
// module.exports = User











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

