import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold text-xl">Admin Panel</h1>
      <div className="flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={logout} className="bg-red-500 px-3 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
