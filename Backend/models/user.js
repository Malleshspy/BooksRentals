const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: {
    type: [String],
    enum: ["renter", "rentee", "admin"],
    default: ["rentee"],
  },

  renterProfile: {
    storeName: { type: String },
    rating: { type: Number, default: 0 },
    totalBooksListed: { type: Number, default: 0 },
  },
  renteeProfile: {
    rentedBooks: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        rentDate: { type: Date, default: Date.now },
        returnDate: { type: Date },
        status: { type: String, enum: ["rented", "returned"], default: "rented" },
      },
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
