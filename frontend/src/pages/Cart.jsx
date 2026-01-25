import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isLoggedIn } from "../utils/auth";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart");
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const { data } = await api.put("/cart/update", {
        productId,
        quantity,
      });
      setCart(data);
    } catch (error) {
      alert("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await api.delete("/cart/remove", {
        data: { productId },
      });
      setCart(data);
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading cart...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <h2>Your Cart</h2>

      {cart.items.map((item) => (
        <div
          key={item.product._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: "80px", marginRight: "15px" }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.product.name}</h4>
            <p>₹{item.price}</p>
          </div>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateQuantity(item.product._id, Number(e.target.value))
            }
            style={{ width: "60px", marginRight: "10px" }}
          />

          <button onClick={() => removeItem(item.product._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{cart.totalAmount}</h3>

      <button
        onClick={() => navigate("/checkout")}
        style={{ padding: "10px", marginTop: "10px" }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
