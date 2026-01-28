import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await axios.get(
          "https://nishu-bhai-ecommerce.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>

        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p>No orders found</p>
        )}

        {orders.map((o) => (
          <div
            key={o._id}
            className="border p-3 mb-3 rounded"
          >
            <p><b>Order ID:</b> {o._id}</p>
            <p><b>Total:</b> ₹{o.totalAmount}</p>
            <p><b>Status:</b> {o.orderStatus}</p>
            <p><b>User:</b> {o.user?.name || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
