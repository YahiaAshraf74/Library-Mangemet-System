const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Borrowing extends Model {}

Borrowing.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  bookId: {
    type: DataTypes.UUID,
    references: {
      model: 'books',
      key: 'id'
    },
    allowNull: false
  },
  borrowerId: {
    type: DataTypes.UUID,
    references: {
      model: 'borrowers',
      key: 'id'
    },
    allowNull: false
  },
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'checked out' // Possible values: 'checked out', 'returned'
  }
}, {
  sequelize,
  modelName: 'Borrowing',
  tableName: 'borrowings'
});

module.exports = Borrowing;
