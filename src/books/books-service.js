const BooksService = {
	getAllBooks(db) {
		return db
			.from("unprinted_books")
			.column(
				"id",
				"title",
				"author",
				"cover_img",
				"summary",
				"price",
				"created_by",
				"date_created"
			);
	},
	getById(db, id) {
		return db.from("unprinted_books").select("*").where("id", id).first();
	},
	getCreatedBooks(db, userId) {
		return db.from("unprinted_books").select("*").where("created_by", userId);
	},
	addBook(db, book) {
		return db
			.insert(book)
			.into("unprinted_books")
			.returning("*")
			.then(([book]) => book);
	},
	deleteBook(db, id) {
		return db.from("unprinted_books").where({ id }).delete();
	},
	getOwned(db, userId) {
		return db
			.from("unprinted_users")
			.column("purchased")
			.where("id", userId)
			.first();
	},
	getOwnedContent(db, book) {
		return db.from("unprinted_books").select("*").whereIn("id", book);
	},
	updateBook(db, id, newBook) {
		return db.from("unprinted_books").where({ id }).update(newBook);
	},
};
module.exports = BooksService;
