import api from "../services/api";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div
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
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
