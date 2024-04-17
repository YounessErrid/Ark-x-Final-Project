const mongoose = require("mongoose");

var subscriptionSchema = new mongoose.Schema(
  {
    // StripeSubscriptionId : {
    //   type : String,
    //   required: true,
    // },
    activationDate : {
      type : Date,
      required: true,
    },
    expirationDate : {
      type : Date,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },

  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
