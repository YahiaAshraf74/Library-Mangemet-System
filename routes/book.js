const express = require('express');
const {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    searchBooks
} = require('../controllers/bookController');

const router = express.Router();

router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.get('/books', getAllBooks);
router.get('/books/search', searchBooks);

module.exports = router;
