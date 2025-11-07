const books = require('../models/book.js');

// Controller to get all books  
exports.addBooks = (req, res) => {
  const bookData = req.body;
  const newBook = new books(bookData);  
  newBook.save()
    .then(() => res.status(201).json({ message: 'Book added successfully', book: newBook }))
    .catch(err => res.status(500).json({ error: 'Failed to add book', details: err }));
};

// // Controller to fetch all books (with search + filters)
// exports.getAllBooks = async (req, res) => {
//   try {
//     const { search, genre } = req.query; // read from query string
//     const filter = {};

//     // ✅ If "search" exists, match title, author, or description (case-insensitive)
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { author: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }

//     // ✅ If "genre" exists, match it exactly (case-insensitive)
//     if (genre) {
//       filter.genre = { $regex: `^${genre}$`, $options: "i" };
//     }

//     // ✅ Fetch filtered books
//     const books = await booksModel.find(filter).sort({ createdAt: -1 });

//     res.status(200).json(books);
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     res.status(500).json({
//       error: "Failed to fetch books",
//       details: err.message,
//     });
//   }
// };

const Books = require("../models/book.js"); // 👈 make sure path is correct

// Controller to fetch all books (with search + filters)
exports.getAllBooks = async (req, res) => {
  try {
    const { search, genre } = req.query; // read from query string
    const filter = {};

    // ✅ If "search" exists, match title, author, or description (case-insensitive)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ✅ If "genre" exists, match it exactly (case-insensitive)
    if (genre) {
      filter.genre = { $regex: `^${genre}$`, $options: "i" };
    }

    // ✅ Fetch filtered books
    const books = await Books.find(filter).sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({
      error: "Failed to fetch books",
      details: err.message,
    });
  }
};
