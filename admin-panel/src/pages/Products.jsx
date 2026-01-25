import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p>₹{p.price}</p>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
