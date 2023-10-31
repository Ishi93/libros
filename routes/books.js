const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Crear un nuevo libro
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
});

// Obtener la lista de todos los libros
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de libros' });
  }
});

// Obtener detalles de un libro en particular
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles del libro' });
  }
});

// Actualizar la información de un libro
router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// Eliminar un libro
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

module.exports = router;
