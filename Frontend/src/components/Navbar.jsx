import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          BookX
        </Link>

        {/* Search */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for books, authors..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-indigo-600"
          >
            Login
          </Link>
          <Link
            to="/sell"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            + Sell
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
