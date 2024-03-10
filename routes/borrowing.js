const express = require('express');
const {
  checkOutBook,
  returnBook,
  listBorrowedBooks
} = require('../controllers/borrowingController');

const router = express.Router();

router.post('/borrowing/check-out', checkOutBook);
router.post('/borrowing/return/:borrowingId', returnBook);
router.get('/borrowing/borrowed-books/:borrowerId', listBorrowedBooks);

module.exports = router;
