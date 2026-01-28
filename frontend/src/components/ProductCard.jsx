import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      // 🔐 token direct localStorage se
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      console.log("POSTING TO BACKEND DIRECTLY");

      await axios.post(
        "https://nishu-bhai-ecommerce.onrender.com/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert("Added to cart ✅");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error.response || error);
      alert("Failed to add to cart ❌");
    }
  };

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={addToCart} className="bg-blue-500 px-5 py-2 rounded text-[#fff]">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
