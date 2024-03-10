const Book = require('../models/book');
const Borrowing = require('../models/borrowing');
const { Op } = require('sequelize');

const checkOutBook = async (req, res) => {
  try {
    const { bookId, borrowerId, dueDate } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book || book.quantity < 1) {
      return res.status(400).json({ message: "Book is not available." });
    }

    const borrowing = await Borrowing.create({ bookId, borrowerId, dueDate, status: 'checked out' });
    await book.decrement('quantity');
    return res.status(201).json(borrowing);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing || borrowing.status === 'returned') {
      return res.status(400).json({ message: "Invalid return operation." });
    }

    await borrowing.update({ status: 'returned', returnedAt: new Date() });
    await Book.increment('quantity', { where: { id: borrowing.bookId } });
    return res.status(200).json({ message: "Book returned successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listBorrowedBooks = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const borrowedBooks = await Borrowing.findAll({
      where: { borrowerId, status: 'checked out' },
      include: Book
    });
    return res.status(200).json(borrowedBooks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkOutBook,
  returnBook,
  listBorrowedBooks
};
