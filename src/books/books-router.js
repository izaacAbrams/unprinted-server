const express = require("express");
const BooksService = require("./books-service");
const xss = require("xss");
const booksRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();
const cloudinary = require('cloudinary').v2
const logger = require("../logger");
const app = require("../app");

const serializeBook = book => ({
    id: book.id,
    title: xss(book.title),
    author: xss(book.author),
    price: xss(book.price),
    cover_img: xss(book.cover_img),
    summary: xss(book.summary),
    created_by: book.created_by,
    content: serializeContent(book.content)
})

function serializeContent(content) {
    let serializedContent = []
    if(content === undefined) {
        return null 
    }
    else if(content.length === undefined) {
        const section = xss(content.section)
        const bookContent = xss(content.content)
        serializedContent.push({section, content: bookContent})
    } else {
        content.map(content => {
            const section = xss(content.section)
            const bookContent = xss(content.content)
            serializedContent.push({section, content: bookContent})
        })
    }
    return JSON.stringify(serializedContent)
}

booksRouter.route('/')
    .get((req,res,next) => {
        BooksService.getAllBooks(req.app.get('db'))
            .then(book => {
                res.json(book)
            })
            .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const {
        title, 
        author, 
        summary,
        cover_img
    } = req.body

    let newBook = {
        title, 
        author, 
        summary
    }
    //uploads the image file to cloudinary to get the url
    cloudinary.uploader.upload(xss(cover_img), function(err, result) { 
        if(err) {
            return res.status(400).json({error: {message: err}})
        }
        newBook = {
            ...newBook, cover_img: result.secure_url
        }
        BooksService.addBook(req.app.get('db'), serializeBook(newBook))
        res.json(newBook)
    }) 


})



module.exports = booksRouter