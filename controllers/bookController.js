const Book = require('../models/book');
const { Op } = require('sequelize');


const createBook = async (req, res) => {
  try {
    const { isbn, title, author, quantity, shelf } = req.body;
    // Input validation or any other business logic can be added here

    const book = await Book.create({ isbn, title, author, quantity, shelf });
    return res.status(201).json(book);
  } catch (error) {
    // Error handling based on the type of error, e.g., duplicate ISBN
    return res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    await book.update(updateData);
    return res.status(200).json({ message: "Book updated successfully.", book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    await book.destroy();
    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
          { isbn: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  searchBooks
};