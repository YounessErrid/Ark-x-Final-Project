const express = require("express");
const router = express.Router();
const controller = require("../controllers/stripe.controller");
const { isAuthenticated } = require("../middlewares/userAuth.middleware");


//   if (!req.body) {
//     return res
//       .status(400)
//       .json("Customer creation failed: missing customer fields");
//   }
//   try {
//     const { email, description, paymentMethodId } = req.body;
//     const customer = await createCustomer({
//       email,
//       description,
//       paymentMethodId,
//     });
//     console.log("Customer created successfully:");
//     console.log(customer);
//     res.status(200).send(customer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("An error occurred while creating the customer.");
//   }
// });

// Define route to create a checkout session

// route to create a checkout session
router.post("/checkout",isAuthenticated,  controller.checkout);

router.get("/subscriptions/:id", isAuthenticated, controller.getSubscription);

// route to handle webhook events
router.post(
  "/",
  isAuthenticated,
  express.raw({ type: "application/json" }),
  controller.handleStripeEvents
);

module.exports = router;
