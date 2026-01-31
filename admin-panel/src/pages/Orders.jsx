import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);

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
        setError(err.response?.data?.message || "Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">All Orders</h2>

        {error && <p className="text-red-600">{error}</p>}

        {orders.map((order) => (
          <div key={order._id} className="border rounded mb-4 shadow">
            {/* ORDER HEADER */}
            <div
              className="p-4 bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => toggleOrder(order._id)}
            >
              <div>
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>User:</b> {order.user?.name} ({order.user?.email})</p>
                <p><b>Total:</b> ₹{order.totalAmount}</p>
              </div>
              <div className="text-right">
                <p><b>Status:</b> {order.orderStatus}</p>
                <p><b>Payment:</b> {order.paymentMethod}</p>
              </div>
            </div>

            {/* ORDER DETAILS */}
            {openOrderId === order._id && (
              <div className="p-4 bg-white">
                {/* SHIPPING ADDRESS */}
                <div className="mb-4">
                  <h3 className="font-bold mb-1">Shipping Address</h3>
                  <p>{order.shippingAddress?.fullName}</p>
                  <p>{order.shippingAddress?.address}</p>
                  <p>
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state} -{" "}
                    {order.shippingAddress?.pincode}
                  </p>
                  <p>📞 {order.shippingAddress?.phone}</p>
                </div>

                {/* PRODUCTS */}
                <h3 className="font-bold mb-2">Products</h3>
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border p-3 mb-3 rounded"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p><b>{item.name}</b></p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}

                {/* SUMMARY */}
                <div className="mt-4 border-t pt-3">
                  <p><b>Payment Status:</b> {order.paymentStatus}</p>
                  <p><b>Order Status:</b> {order.orderStatus}</p>
                  <p><b>Placed On:</b> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
