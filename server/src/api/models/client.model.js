const mongoose = require("mongoose");

var clientSchema = new mongoose.Schema(
  {
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
