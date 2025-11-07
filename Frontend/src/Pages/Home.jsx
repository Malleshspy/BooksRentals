import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import { BookOpen, Code, PenTool, Globe, Layers } from "lucide-react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "Engineering", icon: <Code /> },
    { name: "Novels", icon: <BookOpen /> },
    { name: "Comics", icon: <PenTool /> },
    { name: "School Books", icon: <Layers /> },
    { name: "Others", icon: <Globe /> },
  ];

  // Fetch all books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        console.log(res);
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Buy & Sell Books Easily 📚</h1>
        <p className="text-lg text-gray-100">
          Discover affordable used books or sell your old ones today!
        </p>
      </section>

      {/* Categories */}
      <section className="py-10 container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section className="py-10 container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Available Books
        </h2>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading books...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500 text-lg">{error}</p>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                <img
                  src={book.coverImage || "https://placehold.co/300x400?text=Book"}
                  alt={book.title}
                  className="rounded-md mb-3 w-full h-60 object-cover"
                />
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <p className="text-indigo-600 font-bold mt-2">
                  ₹{book.rentPricePerDay || book.price || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Posted by: {book.owner?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500 text-lg">
              No books available yet.
            </p>
          )
        )}
      </section>
    </div>
  );
};

export default Home;
