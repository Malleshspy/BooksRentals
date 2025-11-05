// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/users/login", form);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         {message && <p className="text-center mt-4 text-indigo-700 font-semibold">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", form);
      setMessage(res.data.message);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      fetchBooks(); // fetch all books after login
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const fetchBooksss = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/books", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };
  useEffect(()=>{
    fetchBooksss();
  })
  console.log(books);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-indigo-700 font-semibold">
            {message}
          </p>
        )}

        {books.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">
              Books List
            </h3>
            <ul className="space-y-2">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="p-3 border rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <p className="font-bold">{book.title}</p>
                  <p className="text-gray-600">by {book.author}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

