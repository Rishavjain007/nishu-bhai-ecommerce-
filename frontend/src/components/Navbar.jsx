import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          NishuBhai
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="text-gray-700 hover:text-indigo-600"
          >
            Cart
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 hidden sm:block">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
