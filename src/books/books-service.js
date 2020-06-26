const BooksService = {
    getAllBooks(db) {
        return db.from('unprinted_books').column(
            "id",
            "title",
            "author",
            "cover_img",
            "summary",
            "price",
            "date_created"
            )
    },
    addBook(db, book) {
        return db
            .insert(book)
            .into('unprinted_books')
            .returning('*')
            .then(([book]) => book)
    }
}
module.exports = BooksService