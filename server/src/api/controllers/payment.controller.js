const Payment = require('../models/payment.model')


const create = async (req, res) => {
    const { date, amount, subscriptionId } = req.body;
  
    try {
      if (!date || !amount || !subscriptionId) {
        return res
          .status(400)
          .json({
            error: "Payment creation failed: Missing required information!",
          });
      }
  
      const newPayment = new Payment({ date, amount, subscriptionId });
      const data = await newPayment.save();
  
      res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data : data
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
  
//   const findOne = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const subscription = await Subscription.findById(id);
  
//       if (subscription) {
//         return res.status(200).json(subscription);
//       } else {
//         return res.status(404).json({ error: "Subscription not found!" });
//       }
//     } catch (error) {
//       return res
//         .status(500)
//         .json([
//           { error: "Internal server error" },
//           { message: `Error finding subscription: ${error.message}` },
//         ]);
//     }
//   };
  
//   const viewAll = async (req, res) => {
//     try {
//       const subscription = await Subscription.find();
  
//       if (subscription.length > 0) {
//         return res.status(200).json(subscription);
//       } else {
//         return res.status(404).json({ error: "No subscription found!" });
//       }
//     } catch (error) {
//       return res
//         .status(500)
//         .json([
//           { error: "Internal server error" },
//           { message: `Error retrieving subscription: ${error.message}` },
//         ]);
//     }
//   };
  
//   const update = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { agencyId, ...newSubscriptionData } = req.body; // Exclude createdAt from newPostData
  
//       if (!id || !newSubscriptionData) {
//         return res
//           .status(400)
//           .json({ error: "Subscription update failed: Missing required fields!" });
//       }
  
//       // Update the client with the given ID
//       const updatedSubscription = await Subscription.findByIdAndUpdate(
//         id,
//         {
//           ...newSubscriptionData,
//         },
//         { new: true }
//       );
  
//       if (!updatedSubscription) {
//         return res.status(404).json({ error: "Subscription not found!" });
//       }
  
//       return res.status(200).json(updatedSubscription);
//     } catch (error) {
//       return res
//         .status(500)
//         .json([
//           { error: "Internal server error" },
//           { message: `Error updating client: ${error.message}` },
//         ]);
//     }
//   };
  
//   const remove = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       if (!id) {
//         return res
//           .status(400)
//           .json({
//             error: "Subscription deletion failed: Missing required information!",
//           });
//       }
  
//       const deletedSubscription = await Subscription.findByIdAndDelete(id);
  
//       if (!deletedSubscription) {
//         return res.status(404).json({ error: "Subscription not found!" });
//       }
  
//       return res.status(200).json({
//         success: true,
//         message: "Subscription deleted successfully",
//       });
//     } catch (error) {
//       return res
//         .status(500)
//         .json([
//           { error: "Internal server error" },
//           { message: `Error deleting Subscription: ${error.message}` },
//         ]);
//     }
//   };


  module.exports = {
    create,
    // findOne,
    // viewAll,
    // update,
    // remove,
  };
