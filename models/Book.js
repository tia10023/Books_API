const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Importa istanza Sequelize

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    field: 'is_published',
    defaultValue: false
  },
  genre: {
    type: DataTypes.STRING(100),
    defaultValue: 'Unknown'
  }
}, {
  tableName: 'books',
  timestamps: false 
});

module.exports = Book;
