import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      alert("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await api.post("/categories", { name });
      setName("");
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      alert("Cannot delete category (used in products)");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

        {/* Add Category */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Category name"
            className="flex-1 border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="bg-indigo-600 text-white px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {/* Category List */}
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{cat.name}</span>
              <button
                onClick={() => deleteCategory(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
