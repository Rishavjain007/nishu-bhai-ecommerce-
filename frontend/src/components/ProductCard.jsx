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
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 mb-2">₹{product.price}</p>

        <button
          onClick={addToCart}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
