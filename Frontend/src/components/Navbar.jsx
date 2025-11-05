import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MyApp</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/login" className="hover:text-gray-200">Login</Link>
        <Link to="/signup" className="hover:text-gray-200">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
