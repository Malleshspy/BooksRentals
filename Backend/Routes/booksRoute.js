const express = require('express');
const router = express.Router();
const {addBooks,getAllBooks} = require('../controllers/booksController');

// Route to get all books
router.post('/', addBooks);
router.get('/', getAllBooks);

module.exports = router;

