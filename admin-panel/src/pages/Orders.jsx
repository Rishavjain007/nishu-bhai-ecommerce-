import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || user.role !== "admin") {
        setError("Admin access denied");
        return;
      }

      try {
        const res = await axios.get(
          "https://nishu-bhai-ecommerce.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        setError("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {orders.map((o) => (
        <div key={o._id}>
          <p>{o._id}</p>
          <p>{o.totalAmount}</p>
          <p>{o.orderStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
