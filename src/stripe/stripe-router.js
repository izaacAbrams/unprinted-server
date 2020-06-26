const express = require("express");
const StripeService = require("./stripe-service");
const path = require("path");
const stripeRouter = express.Router();
const bodyParser = require("body-parser");
const stripe = require("stripe")(
	"sk_test_51Gxx6HLzmqWmrXIYXIPDSrdx8Y4lO2erfeF79g6Fytet1AC2gBrRBSh1i2wIc6SwJfHxdOyHgJ1GPctF2f4BBzZr00iOOxgxHW",
	{ apiVersion: "" }
);

stripeRouter.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

stripeRouter.route("/").post((req, res, next) => {
	const newConnection = {
		user_id: req.body.user_id,
		code: req.body.code,
	};
	return StripeService.connectStripe(req.app.get("db"), newConnection).then(
		(response) => {
			if (response.error) {
				res.status(400).json(response.error);
			}
			res.status(201).json(response);
		}
	);
});


stripeRouter.route("/secret").post((req, res, next) => {
	return StripeService.stripeSession(req.app.get("db"), req.body).then(
		(session) => {
			if (session.error) {
				res.status(400).json(session.error);
			}
			res.json(session.id);
		}
	);
});

stripeRouter.post(
	"/webhook",
  bodyParser.raw({type: 'application/json'}),
	(req, res) => {

		const signature = req.headers["stripe-signature"];
		let event;

		const webhook_secret = "whsec_Fnhnnr4e6u0NYkYinFCcWwJXYJPNczA5";
		  try {
         		  event = stripe.webhooks.constructEvent(req.body, signature, webhook_secret);
		  } catch (err) {
		    res.status(400).send(`Webhook Error: ${err.message}`);
      } 
    
		//   // Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				// const paymentIntent = event.data.object;
				//       // Then define and call a method to handle the successful payment intent.
				//       // handlePaymentIntentSucceeded(paymentIntent);
				// StripeService.handlePaymentSucceed(paymentIntent);
        
        break;
      case 'payment_intent.created':
        break;
        case "charge.succeeded": 
        const paymentIntent = event.data.object
        StripeService.handlePaymentSucceed(paymentIntent)
        break;
			default:
				// Unexpected event type
				return res.status(400).end();
		}

		// Return a response to acknowledge receipt of the event
		res.json({ received: true });
	}
);

module.exports = stripeRouter;
