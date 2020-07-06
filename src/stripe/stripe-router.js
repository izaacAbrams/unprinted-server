const express = require("express");
const StripeService = require("./stripe-service");
const path = require("path");
const stripeRouter = express.Router();
const bodyParser = require("body-parser");
const config = require('../config');
const e = require("express");
const { requireAuth } = require("../middleware/jwt-auth");

const stripe = require("stripe")(
	config.STRIPE_SECRET,
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
})
.get(requireAuth, (req, res, next) => {
	return StripeService.hasStripeConnection(req.app.get('db'), req.query.user).then(
		response => {
			if(!response) {
				return status(404).json({connected: false})
			} 
			res.status(200).json({connected: true})
		}
	)
})


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

		const webhook_secret = config.WEBHOOK_SECRET;
		  try {
         		  event = stripe.webhooks.constructEvent(req.body, signature, webhook_secret);
		  } catch (err) {
		    res.status(400).send(`Webhook Error: ${err.message}`);
      } 
    
		//   // Handle the event
		switch (event.type) {
        case "charge.succeeded": 
        const paymentIntent = event.data.object
        StripeService.handlePaymentSucceed(req.app.get('db'), paymentIntent)
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
