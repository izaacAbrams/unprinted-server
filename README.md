# Unprinted

[Live Link](https://unprinted-client.vercel.app/)

## API Endpoints:

- ### /books

  - GET all books. Returns all books with no content for displaying in library.
  - POST requires authentication. Posts new book to database.
  - /owned/:user GET requires auth. Returns book with content that user owns.
  - /created/:user GET requires auth. Returns book with content that user has created.
  - /:book_id DELETE, PATCH and POST a book. Requires auth.

- ### /auth

  - /auth/login POST Given correct login creds, will create JWT and return the created token.

- ### /users

  - POST given that the email has not been taken, will create user.

- ### /stripe
- POST creates a stripe session for the checkout.
- /webhook POST listens for events to redirect when checkout is complete.
- /secret POST creates a stripe session for user to create an account.

## Summary

Unprinted is a crowdsourced, early access book library that gives the reader content more frequently than a traditional publisher. By doing this, the author can release only a chapter of the book at a time, and the reader does not have to wait roughly a year between publishings. The reader is able to view each book, and if interested in buying one can purchase and then begin reading it in the app.

## Screenshots

<img src="https://res.cloudinary.com/unprinted/image/upload/v1594062755/screenshots/LandingPage_vuzpbp.png" alt="Landing Page" width="500"/>

The landing page, which has a description of the app and how to use it.

<img src="https://res.cloudinary.com/unprinted/image/upload/v1594062755/screenshots/BooksList_dxm4tp.png" alt="Book List" width="500"/>

The searchable library, where you can view a list of available books.

<img src="https://res.cloudinary.com/unprinted/image/upload/v1594062755/screenshots/BookDisplay_hooqgp.png" alt="Book Page" width="500"/>

An example of a books display page. User is able to either purchase book, or read book if owned.

<img src="https://res.cloudinary.com/unprinted/image/upload/v1594079152/screenshots/Book_Reader_hwbdnr.png" alt="Book Reader" width="500"/>

An example of the layout of a book when reading.

## Tech Used

React, Redux/Router, Stripe, Cloudinary, JWT, node.js, Express, PostgreSQL, Javascript ES6, HTML, CSS
