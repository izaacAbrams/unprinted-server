const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Users Endpoints", function () {
	let db;

	const { testUsers } = helpers.makeUnprintedFixtures();
	const testUser = testUsers[0];

	before("make knex instance", () => {
		db = knex({
			client: "pg",
			connection: process.env.TEST_DATABASE_URL,
		});
		app.set("db", db);
	});

	after("disconnect from db", () => db.destroy());
	before("cleanup", () => helpers.cleanTables(db));
	afterEach("cleanup", () => helpers.cleanTables(db));

	describe(`POST /api/users`, () => {
		context(`User Validation`, () => {
			beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

			const requiredFields = ["email", "password", "name"];

			requiredFields.forEach((field) => {
				const registerAttemptBody = {
					email: "test@test.com",
					password: "test password",
					name: "test full_name",
				};

				it(`responds with 400 required error when '${field}' is missing`, () => {
					delete registerAttemptBody[field];

					return supertest(app)
						.post("/api/users")
						.send(registerAttemptBody)
						.expect(400, {
							error: `Missing '${field}' in request body`,
						});
				});
			});

			it(`responds 400 'Password be longer than 8 characters' when empty password`, () => {
				const userShortPassword = {
					email: "test@test.com",
					password: "1234567",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(userShortPassword)
					.expect(400, { error: `Password be longer than 8 characters` });
			});

			it(`responds 400 'Password be less than 72 characters' when long password`, () => {
				const userLongPassword = {
					email: "test@test.com",
					password: "*".repeat(73),
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(userLongPassword)
					.expect(400, { error: `Password be less than 72 characters` });
			});

			it(`responds 400 error when password starts with spaces`, () => {
				const userPasswordStartsSpaces = {
					email: "test@test.com",
					password: " 1Aa!2Bb@",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(userPasswordStartsSpaces)
					.expect(400, {
						error: `Password must not start or end with empty spaces`,
					});
			});

			it(`responds 400 error when password ends with spaces`, () => {
				const userPasswordEndsSpaces = {
					email: "test@test.com",
					password: "1Aa!2Bb@ ",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(userPasswordEndsSpaces)
					.expect(400, {
						error: `Password must not start or end with empty spaces`,
					});
			});

			it(`responds 400 error when password isn't complex enough`, () => {
				const userPasswordNotComplex = {
					email: "test@test.com",
					password: "11AAaabb",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(userPasswordNotComplex)
					.expect(400, {
						error: `Password must contain one upper case, lower case, number and special character`,
					});
			});

			it(`responds 400 'Username already taken' when email isn't unique`, () => {
				const duplicateUser = {
					email: testUser.email,
					password: "11AAaa!!",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(duplicateUser)
					.expect(400, { error: `Username already taken` });
			});
		});

		context(`Happy path`, () => {
			it(`responds 201, serialized user, storing bcryped password`, () => {
				const newUser = {
					email: "test@test.com",
					password: "11AAaa!!",
					name: "test full_name",
				};
				return supertest(app)
					.post("/api/users")
					.send(newUser)
					.expect(201)
					.expect((res) => {
						expect(res.body).to.have.property("id");
						expect(res.body.email).to.eql(newUser.email);
						expect(res.body.name).to.eql(newUser.name);
						expect(res.body).to.not.have.property("password");
						expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
						const expectedDate = new Date().toLocaleString("en");
						const actualDate = new Date(res.body.date_created).toLocaleString();
						expect(actualDate).to.eql(expectedDate);
					})
					.expect((res) =>
						db
							.from("unprinted_users")
							.select("*")
							.where({ id: res.body.id })
							.first()
							.then((row) => {
								expect(row.email).to.eql(newUser.email);
								expect(row.name).to.eql(newUser.name);
								const expectedDate = new Date().toLocaleString("en");
								const actualDate = new Date(row.date_created).toLocaleString();
								expect(actualDate).to.eql(expectedDate);

								return bcrypt.compare(newUser.password, row.password);
							})
							.then((compareMatch) => {
								expect(compareMatch).to.be.true;
							})
					);
			});
		});
	});
});
