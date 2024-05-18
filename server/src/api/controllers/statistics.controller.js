const Payment = require("../models/payment.model");
const Subscription = require("../models/subscription.model");
const Agency = require("../models/agency.model");
const Client = require("../models/client.model");



const statistics = async (req, res) => {
    const today = new Date();
    const firstDayCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
  
    try {
      //  Total revenue for the current month
      const currentMonthRevenue = await Payment.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
  
      // Total revenue for the previous month
      const previousMonthRevenue = await Payment.aggregate([
        { $match: { date: { $lte: firstDayCurrentMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
  
      // Active subscriptions for the current month
      const currentMonthSubscriptions = await Subscription.countDocuments({
        activated: true,
      });
  
      // Active subscriptions for the previous month
      const previousMonthSubscriptions = await Subscription.countDocuments({
        activated: true,
        activationDate: { $lte: firstDayCurrentMonth },
      });
  
      // agencies
      const agenciesCount = await Agency.countDocuments();
  
      // clients
      const clientsCount = await Client.countDocuments();
  
      res.json({
        success: true,
        message: "Successfully fetched statistics",
        data: {
          revenue: {
            current: currentMonthRevenue[0] ? currentMonthRevenue[0].total : 0,
            previous: previousMonthRevenue[0] ? previousMonthRevenue[0].total : 0,
          },
          subscriptions: {
            current: currentMonthSubscriptions,
            previous: previousMonthSubscriptions,
          },
          agencies: agenciesCount,
          clients: clientsCount,
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: `Error fetching statistics: ${error.message}`,
      });
    }
  };
  
  const yearlyRevenueAndSubscription = async (req, res) => {
    const today = new Date("2024-12-01T00:00:00.000Z"); // Assuming you want to test with a fixed date
    const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
  
    try {
      const monthlyRevenues = await Payment.aggregate([
        {
          $match: {
            date: { $gte: startOfYear, $lt: today },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalRevenue: 1,
          },
        },
      ]);
  
      const monthlySubscriptions = await Subscription.aggregate([
        {
          $match: {
            activationDate: { $gte: startOfYear, $lt: today },
            activated: true,
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$activationDate" },
              year: { $year: "$activationDate" },
            },
            totalSubscriptions: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalSubscriptions: 1,
          },
        },
      ]);
  
      res.json({
        success: true,
        message:
          "Successfully fetched monthly revenue and subscriptions from the start of this year",
        data: {
          monthlyRevenue: monthlyRevenues,
          monthlySubscription: monthlySubscriptions,
        },
      });
    } catch (error) {
      console.error("Error fetching yearly revenue stats:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: `Error fetching yearly revenue and subscriptions: ${error.message}`,
      });
    }
  };
  
  const latesTransations = async (req, res) => {
    try {
      const latesTransations = await Payment.find({})
        .populate({
          path: "subscriptionId",
          populate: {
            path: "agencyId",
            model: "Agency",
          },
        })
        .sort({ createdAt: -1 })
        .limit(5);
  
      if (latesTransations.length === 0) {
        return res.status(404).json({ error: "No transaction found!" });
      }
  
      const latesTransationsData = latesTransations.map((transaction) => {
        const transactionDate = transaction.date.toISOString().split('T')[0]
        return { agency: transaction.subscriptionId?.agencyId == null ? "null" : transaction.subscriptionId.agencyId?.agencyName ,
                  transactionDate,
                  amount : transaction.amount
                };
      });
    
      res.json({
        success: true,
        message: "Successfully fetched latest transaction",
        data: {
          latesTransationsData,
        },
      });
    } catch (error) {
      console.error("Error fetching latest transaction: ", error);
      return res.status(500).json({
        error: "Internal server error",
        message: `Error fetching latest transaction: ${error.message}`,
      });
    }
  };


  module.exports = {
    statistics,
    yearlyRevenueAndSubscription,
    latesTransations,
  };