const books = require('../models/book.js');

// Controller to get all books  
exports.addBooks = (req, res) => {
  const bookData = req.body;
  const newBook = new books(bookData);  
  newBook.save()
    .then(() => res.status(201).json({ message: 'Book added successfully', book: newBook }))
    .catch(err => res.status(500).json({ error: 'Failed to add book', details: err }));
};

exports.getAllBooks = (req, res) => {
  books.find()
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ error: 'Failed to fetch books', details: err }));
}