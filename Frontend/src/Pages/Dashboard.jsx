import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  console.log(books);

  // ✅ Fetch all books from backend when page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-lg mb-6 shadow">
        <h1 className="text-2xl font-bold">📚 Book Rental Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </header>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition"
          >
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
            )}
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500 mt-1">{book.genre}</p>
            <p className="mt-2 font-semibold text-indigo-700">
              ₹{book.rentPricePerDay}/day
            </p>
          </div>
        ))}
      </div>

      {/* If no books available */}
      {books.length === 0 && (
        <p className="text-center text-gray-600 mt-10 text-lg">
          No books available yet.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
