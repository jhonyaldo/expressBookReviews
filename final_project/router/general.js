const express = require('express');
const public_users = express.Router();
const axios = require('axios');

let books = require('./booksdb.js');

// Endpoint para obtener todos los libros
public_users.get('/', async (req, res) => {
    try {
        res.status(200).send(JSON.stringify(books, null, 4)); // JSON con indentación
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// Endpoint para obtener detalles del libro por ISBN usando async-await y Axios
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = books[isbn];
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book details" });
    }
});

// Endpoint para obtener detalles del libro por autor usando async-await y Axios
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const booksByAuthor = [];
        Object.keys(books).forEach(key => {
            if (books[key].author === author) {
                booksByAuthor.push(books[key]);
            }
        });
        if (booksByAuthor.length > 0) {
            res.status(200).send(booksByAuthor);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by author" });
    }
});

// Endpoint para obtener detalles del libro por título usando async-await y Axios
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const booksByTitle = [];
        Object.keys(books).forEach(key => {
            if (books[key].title === title) {
                booksByTitle.push(books[key]);
            }
        });
        if (booksByTitle.length > 0) {
            res.status(200).send(booksByTitle);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by title" });
    }
});

// Endpoint para obtener reseñas del libro por ISBN
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.status(200).send(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
