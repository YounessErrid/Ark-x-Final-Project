const mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    require: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
