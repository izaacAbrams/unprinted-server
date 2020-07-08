const express = require("express");
const BooksService = require("./books-service");
const xss = require("xss");
const booksRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();
const cloudinary = require("cloudinary").v2;
const logger = require("../logger");

const serializeBook = (book) => ({
	id: book.id,
	title: xss(book.title),
	author: xss(book.author),
	price: xss(book.price),
	cover_img: xss(book.cover_img),
	summary: xss(book.summary),
	created_by: book.created_by,
	content: serializeContent(book.content),
});

function serializeContent(content) {
	let serializedContent = [];
	if (content === undefined) {
		return null;
	} else if (content.length === undefined) {
		const section = xss(content.section);
		const bookContent = xss(content.content);
		serializedContent.push({ section, content: bookContent });
	} else {
		content.map((content) => {
			const section = xss(content.section);
			const bookContent = xss(content.content);
			serializedContent.push({ section, content: bookContent });
		});
	}
	return JSON.stringify(serializedContent);
}
booksRouter.use(express.json({ limit: "10mb" }));

booksRouter
	.route("/")
	.get((req, res, next) => {
		BooksService.getAllBooks(req.app.get("db"))
			.then((book) => {
				res.json(book);
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { title, author, summary, price, created_by, cover_img } = req.body;

		let newBook = {
			title,
			author,
			summary,
			price,
			created_by,
		};
		//uploads the image file to cloudinary to get the url
		cloudinary.uploader.upload(xss(cover_img), function (err, result) {
			if (err) {
				return res.status(400).json({ error: { message: err } });
			}
			newBook = {
				...newBook,
				cover_img: result.secure_url,
			};
			BooksService.addBook(req.app.get("db"), serializeBook(newBook))
				.then((book) => {
					res
						.status(201)
						.location(path.posix.join(req.originalUrl, `/${book.id}`))
						.json(book);
				})
				.catch(next);
		});
	});

booksRouter.route("/owned/:user").get(requireAuth, async (req, res, next) => {
	const ownedId = await BooksService.getOwned(
		req.app.get("db"),
		req.params.user
	)
		.then((owned) => {
			return owned.purchased;
		})
		.catch(next);

	if (ownedId !== null) {
		BooksService.getOwnedContent(req.app.get("db"), ownedId)
			.then((book) => {
				res.json(book);
			})
			.catch(next);
	} else {
		return res.json({ message: "No books found." });
	}
});

booksRouter
	.route("/:book_id")
	.all(requireAuth, (req, res, next) => {
		BooksService.getById(req.app.get("db"), req.params.book_id)
			.then((book) => {
				if (!book) {
					return res.status(404).json({
						error: { message: `Book doesn't exist` },
					});
				}
				res.book = book;
				next();
			})
			.catch(next);
	})
	.delete(requireAuth, (req, res, next) => {
		const { book_id } = req.params;
		BooksService.deleteBook(req.app.get("db"), book_id)
			.then((numRowsAffected) => {
				logger.info(`Book with id ${book_id} deleted`);
				res.status(204).end();
			})
			.catch(next);
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { title, author, summary, price, created_by } = req.body;

		const content = serializeContent(req.body.content);

		const bookToCreate = {
			content,
			title,
			author,
			summary,
			price,
			created_by,
		};
		const numberOfValues = Object.values(bookToCreate).filter(Boolean).length;

		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'content'`,
				},
			});
		}

		BooksService.updateBook(req.app.get("db"), req.params.book_id, bookToUpdate)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch();
	})
	.patch(requireAuth, jsonParser, (req, res, next) => {
		const { title, author, summary, price, created_by } = req.body;

		const content = serializeContent(req.body.content);

		const bookToUpdate = {
			content,
			title,
			author,
			summary,
			price,
			created_by,
		};
		const numberOfValues = Object.values(bookToUpdate).filter(Boolean).length;

		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'content'`,
				},
			});
		}

		BooksService.updateBook(req.app.get("db"), req.params.book_id, bookToUpdate)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch();
	});

booksRouter.route("/created/:user_id").get((req, res, next) => {
	BooksService.getCreatedBooks(req.app.get("db"), req.params.user_id)
		.then((books) => {
			if (books.length > 0) {
				res.json(books);
			} else {
				return res.json({ message: "No books found" });
			}
		})
		.catch(next);
});
module.exports = booksRouter;
