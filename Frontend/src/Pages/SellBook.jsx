import { useState } from "react";
import axios from "axios";

const SellBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedYear: "",
    rentPricePerDay: "",
    coverImage: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/books", book, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message || "Book listed successfully!");
      setBook({
        title: "",
        author: "",
        genre: "",
        description: "",
        publishedYear: "",
        rentPricePerDay: "",
        coverImage: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Error: " + (err.response?.data?.message || "Failed to add book."));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          📚 Sell Your Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["title", "author", "genre", "publishedYear", "rentPricePerDay", "coverImage"].map(
            (field, index) => (
              <div key={index}>
                <label className="block text-gray-700 mb-1 capitalize">{field}</label>
                <input
                  type={field === "rentPricePerDay" || field === "publishedYear" ? "number" : "text"}
                  name={field}
                  value={book[field]}
                  onChange={handleChange}
                  required={["title", "author", "rentPricePerDay"].includes(field)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )
          )}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Post Book
          </button>
        </form>

        {message && (
          <p className="text-center text-indigo-700 font-semibold mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellBook;
