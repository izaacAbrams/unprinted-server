const config = require('../config')
const stripe = require("stripe")(
	config.STRIPE_SECRET,
	{ apiVersion: "" }
);

const StripeService = {
	async connectStripe(db, newConnection) {
		const response = await stripe.oauth.token({
			grant_type: "authorization_code",
			code: newConnection.code,
		});
		let connected_account_id = response.stripe_user_id;
		if (!!!connected_account_id) {
			return response;
		}
		const newAccount = {
			account_id: connected_account_id,
			user_id: newConnection.user_id,
		};
		return db
			.insert(newAccount)
			.into("unprinted_accounts")
			.returning("*")
			.then(([account]) => account);
	},

	stripeSession(db, book) {
		const user_id = book.user_id;

		return db("unprinted_accounts")
			.where({ user_id })
			.first()
			.returning("account_id")
			.then(async (acct) => {
				const session = await stripe.checkout.sessions.create({
					payment_method_types: ["card"],
					line_items: [
						{
							name: book.title,
							amount: 500,
							currency: "usd",
							quantity: 1,
							
						},
					],
					payment_intent_data: {
						application_fee_amount: 100,
						transfer_data: {
							destination: acct.account_id,
						},
						metadata: {
								'id': book.id,
								'user_id': book.user_id
							}
					},
					success_url: "unprinted-client.vercel.app/success",
					cancel_url: "unprinted-client.vercel.app/failure",
				});
				return session;
			});
	},

	handlePaymentSucceed(db, paymentIntent) {
		return db.from('unprinted_users')
		.where('id', paymentIntent.metadata.user_id)
		.first()
		.then(user => {
			const userPurchased = user.purchased
			userPurchased.push(parseInt(paymentIntent.metadata.id))
			return db.from('unprinted_users')
			.where('id', paymentIntent.metadata.user_id)
			.first()
			.update({purchased: userPurchased})
		})
	},

};

module.exports = StripeService;
