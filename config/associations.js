module.exports = (sequelize) => {
  const Book = require('../models/book');
  const Borrower = require('../models/borrower');
  const Borrowing = require('../models/borrowing');


  Book.hasMany(Borrowing, { foreignKey: 'bookId' });
  Borrowing.belongsTo(Book, { foreignKey: 'bookId' });

  Borrower.hasMany(Borrowing, { foreignKey: 'borrowerId' });
  Borrowing.belongsTo(Borrower, { foreignKey: 'borrowerId' });
};
