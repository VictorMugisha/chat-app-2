import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat App</h1>
        <div>
          <Link to="/" className="mx-2 hover:underline">
            Home
          </Link>
          <Link to="/profile" className="mx-2 hover:underline">
            Profile
          </Link>
          <Link to="/login" className="mx-2 hover:underline">
            Login
          </Link>
          <Link to="/register" className="mx-2 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
