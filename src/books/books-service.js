const BooksService = {
    getAllBooks(knex) {
        return knex.from('unprinted_books').column(
            "id",
            "title",
            "author",
            "cover_img",
            "summary",
            "price",
            "date_created"
            )
    }
}
module.exports = BooksService