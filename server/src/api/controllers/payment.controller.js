const Payment = require("../models/payment.model");

const create = async (req, res) => {
  const { date, amount, subscriptionId } = req.body;

  try {
    if (!date || !amount || !subscriptionId) {
      return res.status(400).json({
        error: "Payment creation failed: Missing required information!",
      });
    }

    const newPayment = new Payment({ date, amount, subscriptionId });
    const data = await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error creating payment: ${error.message}` },
      ]);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);

    if (payment) {
      return res.status(200).json(payment);
    } else {
      return res.status(404).json({ error: "Payment not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error finding Payment: ${error.message}` },
      ]);
  }
};

const viewAll = async (req, res) => {
  try {
    const payment = await Payment.find();

    if (payment.length > 0) {
      return res.status(200).json(payment);
    } else {
      return res.status(404).json({ error: "No payment found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error retrieving payment: ${error.message}` },
      ]);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { subscriptionId, ...newPaymentData } = req.body; // Exclude createdAt from newPostData

    if (!id || !newPaymentData) {
      return res
        .status(400)
        .json({ error: "Payment update failed: Missing required fields!" });
    }

    // Update the client with the given ID
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        ...newPaymentData,
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found!" });
    }

    return res.status(200).json(updatedPayment);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating Payment: ${error.message}` },
      ]);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Payment deletion failed: Missing required information!",
      });
    }

    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
      data: deletedPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error deleting Payment: ${error.message}` },
      ]);
  }
};

module.exports = {
  create,
  findOne,
  viewAll,
  update,
  remove,
};
