const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { expect } = require("chai");

describe("Stripe Endpoint", function () {
	let db;

	const { testUsers, testBooks } = helpers.makeUnprintedFixtures();

	before("make knex instance", () => {
		db = knex({
			client: "pg",
			connection: process.env.TEST_DATABASE_URL,
		});
		app.set("db", db);
	});

	after("disconnected from db", () => db.destroy());
	before("cleanup", () => helpers.cleanTables(db));
	afterEach("cleanup", () => helpers.cleanTables(db));

	describe("POST /api/stripe/secret", () => {
		before("insert users", () => helpers.seedUsers(db, testUsers));
		before("insert books", () => helpers.seedBooks(db, testBooks));
		before("insert account", () => helpers.seedAccount(db));
		it(`connects with stripe session with status 201`, function () {
			const request = {
				title: testBooks[0].title,
				user_id: testUsers[0].id,
				id: testBooks[0].id,
			};

			return supertest(app)
				.post("/api/stripe/secret")
				.send(request)
				.expect(200)
				.expect((res) => {
					expect(res.body).to.be.a("string");
				});
		});
	});
});
