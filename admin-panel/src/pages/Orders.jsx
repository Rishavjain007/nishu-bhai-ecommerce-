import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        {orders.map((o) => (
          <div key={o._id} className="border p-2 mb-2">
            Order ₹{o.totalAmount} – {o.orderStatus}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
