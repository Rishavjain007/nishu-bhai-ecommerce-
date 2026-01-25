import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
