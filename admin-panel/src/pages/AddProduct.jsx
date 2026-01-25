import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    stock: "",
  });

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Category fetch error", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", form);
      alert("Product added successfully");
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Product Name"
            className="w-full border p-2"
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full border p-2"
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full border p-2"
            onChange={handleChange}
            required
          />

          {/* CATEGORY SELECT (ONLY OPTION YOU WANTED) */}
          <select
            name="category"
            className="w-full border p-2"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            className="w-full border p-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2"
            onChange={handleChange}
            required
          />

          <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
