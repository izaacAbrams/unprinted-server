const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { expect } = require("chai");

describe("Books Endpoint", function () {
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

	describe("POST /api/books", () => {
		before("insert users", () => helpers.seedUsers(db, testUsers));

		it(`creates a book, responding 201 and new book`, function () {
			const testBook = {
				title: "Test book",
				author: "Test McTestington",
				cover_img:
					"https://res.cloudinary.com/unprinted/image/upload/v1592686823/unprinted-images/ex_book_6_agrqxq.png",
				summary: "This is a test book",
				price: 1,
				created_by: 1,
			};

			return supertest(app)
				.post("/api/books")
				.set("Authorization", helpers.makeAuthHeader(testUsers[0]))
				.send(testBook)
				.expect(201)
				.expect((res) => {
					expect(res.body).to.have.property("id");
					expect(res.body.title).to.eql(testBook.title);
					expect(res.body.author).to.eql(testBook.author);
					expect(res.body).to.have.property("cover_img");
					expect(res.body.summary).to.eql(testBook.summary);
					expect(res.body.price).to.eql(testBook.price.toString());
				});
		});
	});

	describe("GET /api/book/:book_id", () => {
		context("Given no books", () => {
			before("insert users", () => helpers.seedUsers(db, testUsers));

			it("responds with 404", () => {
				const fakeBook = 404;
				return supertest(app)
					.get(`/api/books/${fakeBook}`)
					.set("Authorization", helpers.makeAuthHeader(testUsers[0]))
					.expect(404, { error: { message: `Book doesn't exist` } });
			});
		});
	});
});
