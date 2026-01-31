import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "admin") {
          setError("Admin access denied");
          return;
        }

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
        setError(err.response?.data?.message || "403 Forbidden");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        {error && <p className="text-red-600">{error}</p>}
        {orders.map((o) => (
          <div key={o._id} className="border p-3 mb-3">
            <p><b>Order ID:</b> {o._id}</p>
            <p><b>Total:</b> ₹{o.totalAmount}</p>
            <p><b>Status:</b> {o.orderStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
