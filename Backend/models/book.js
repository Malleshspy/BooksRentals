const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  rentPricePerDay: {
    type: Number,
    required: true,
    default: 10,
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1,
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1,
  },
  coverImage: {
    type: String, // URL or Cloudinary path
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Books=mongoose.model("Book", bookSchema);
module.exports = Books;
