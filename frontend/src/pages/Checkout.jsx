import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isLoggedIn } from "../utils/auth";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isLoggedIn()) {
    navigate("/login");
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      await api.post("/orders", {
        shippingAddress: form,
        paymentMethod: "COD",
      });

      alert("Order placed successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Checkout</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.toUpperCase()}
          value={form[key]}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        />
      ))}

      <button
        onClick={placeOrder}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
}

export default Checkout;
