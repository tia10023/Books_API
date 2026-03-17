const express = require('express');
const { Op } = require('sequelize');  // ← AGGIUNTO QUI
const Book = require('../models/Book');
const router = express.Router();

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const { author, year, genre, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * parseInt(limit);

    const where = {};
    if (author) where.author = { [Op.iLike]: `%${author}%` };
    if (year) where.year = parseInt(year);
    if (genre) where.genre = genre;

    const { count, rows } = await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['id', 'DESC']]
    });

    res.json({
      data: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ data: book.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/books
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ data: book, message: 'Book created' });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    
    if (updated === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const book = await Book.findByPk(req.params.id);
    res.json({ data: book, message: 'Book updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
